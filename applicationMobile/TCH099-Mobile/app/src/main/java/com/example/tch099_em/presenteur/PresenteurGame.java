package com.example.tch099_em.presenteur;

import android.app.Activity;

import com.example.tch099_em.modele.Modele;
import com.example.tch099_em.modele.ModeleManager;
import com.example.tch099_em.modele.dao.GameDao;
import com.example.tch099_em.modele.entite.Game;
import com.example.tch099_em.vue.CalendrierActivity;

import org.json.JSONException;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class PresenteurGame {
    private Activity activite;
    private Modele modele;

    public PresenteurGame(Activity view) {
        this.activite = view;
        this.modele = ModeleManager.getModele();
    }

    public void obtenirGames(int idLigue) {
        new Thread() {
            @Override
            public void run() {
                try {
                    List<Game> games = GameDao.getGames(idLigue);
                    Collections.reverse(games); // Match plus recent en haut

                    if (games.isEmpty()) {
                        ((CalendrierActivity)activite).runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                ((CalendrierActivity)activite).afficherMessage("La ligue ne contient pas de matchs");
                                ((CalendrierActivity)activite).raffraichirGames(true);
                            }
                        });
                    } else {
                        modele.setGames(games);

                        ((CalendrierActivity)activite).runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                ((CalendrierActivity)activite).raffraichirGames(false);
                            }
                        });
                    }
                } catch (JSONException e) {
                    ((CalendrierActivity)activite).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            ((CalendrierActivity)activite).afficherMessage("Problème JSON");
                        }
                    });
                } catch (IOException e) {
                    ((CalendrierActivity)activite).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            ((CalendrierActivity)activite).afficherMessage("Problème connexion API");
                        }
                    });
                }
            }
        }.start();
    }

    public int getNombreGame() { return this.modele.getGames().size(); }

    public Game getGame(int position) {
        return this.modele.getGames().get(position);
    }

    public Game getGame(int idGame, boolean id) {
        if (id) {
            return this.modele.getGameAvecId(idGame);
        }
        return null;
    }
}
