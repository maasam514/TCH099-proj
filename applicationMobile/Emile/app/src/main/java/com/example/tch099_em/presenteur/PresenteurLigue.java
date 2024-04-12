package com.example.tch099_em.presenteur;

import android.app.Activity;
import android.util.Log;

import com.example.tch099_em.interfaces.LigueView;
import com.example.tch099_em.modele.Modele;
import com.example.tch099_em.modele.ModeleManager;
import com.example.tch099_em.modele.dao.LigueDao;
import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.vue.MainActivity;

import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public class PresenteurLigue {
    private LigueView view;
    private Modele modele;

    public PresenteurLigue(LigueView view) {
        this.view = view;
        this.modele = ModeleManager.getModele();
    }

    public void obtenirLigues() {
        new Thread() {
            @Override
            public void run() {

                try {
                    List<Ligue> liste = LigueDao.getLigues();
                    modele.setLigues(liste);

                    ((Activity)view).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            view.raffraichirSpinner();
                        }
                    });
                } catch (JSONException e) {
                    ((Activity)view).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            view.afficherMessage("Exception JSON");
                        }
                    });
                } catch (IOException e) {
                    ((Activity)view).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            view.afficherMessage("Exception accès API");
                        }
                    });
                }

            }
        }.start();
    }

    public List<Ligue> getListeLigues() { return this.modele.getLigues(); }

    public Ligue getLigue(int position) {
        return this.modele.getLigues().get(position);
    }

    public Ligue getLigue(String nom) { return this.modele.getLigue(nom); }

    public int getNombreLigues() { return this.modele.getLigues().size(); }
}
