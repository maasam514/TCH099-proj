package com.example.tch099_em.presenteur;

import android.app.Activity;

import com.example.tch099_em.modele.Modele;
import com.example.tch099_em.modele.ModeleManager;
import com.example.tch099_em.modele.dao.StatsEquipeDao;
import com.example.tch099_em.modele.entite.StatsEquipe;
import com.example.tch099_em.vue.MainActivity;

import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public class PresenteurStatEquipe {
    private Activity activite;
    private Modele modele;

    public PresenteurStatEquipe(Activity activite) {
        this.activite = activite;
        this.modele = ModeleManager.getModele();
    }

    public void obtenirStatsEquipes(int idLigue) {

        ((MainActivity)activite).showLoading();

        new Thread() {
            @Override
            public void run() {
                try {
                    List<StatsEquipe> statistiquesEquipes = StatsEquipeDao.getStatsEquipe(idLigue);

                    if (statistiquesEquipes.isEmpty()) {
                        ((MainActivity)activite).runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                ((MainActivity)activite).afficherMessage("La ligue ne contient pas d'équipes");
                                ((MainActivity)activite).raffraichirListStats(true);
                                ((MainActivity)activite).hideLoading();
                            }
                        });
                    } else {

                        modele.setStatistiquesEquipes(statistiquesEquipes);

                        ((MainActivity) activite).runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                ((MainActivity) activite).raffraichirListStats(false);
                                ((MainActivity) activite).hideLoading();
                            }
                        });
                    }
                } catch (JSONException e) {
                    ((MainActivity)activite).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            ((MainActivity)activite).afficherMessage("Problème JSON");
                        }
                    });
                } catch (IOException e) {
                    ((MainActivity)activite).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            ((MainActivity)activite).afficherMessage("Problème connexion API");
                        }
                    });
                }
            }
        }.start();
    }
    public List<StatsEquipe> getListeStats() {
        return this.modele.getStatistiquesEquipes();
    }

    public StatsEquipe getStatsEquipe(int position) {
        return this.modele.getStatistiquesEquipes().get(position);
    }

    public StatsEquipe getStatsEquipe(String nom) { return this.modele.getStatiquesEquipe(nom); }

    public int getNombreStatsEquipe() { return this.modele.getStatistiquesEquipes().size(); }
}
