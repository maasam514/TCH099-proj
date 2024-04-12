package com.example.tch099_em.presenteur;

import android.app.Activity;

import com.example.tch099_em.interfaces.StatsJoueursView;
import com.example.tch099_em.modele.Modele;
import com.example.tch099_em.modele.ModeleManager;
import com.example.tch099_em.modele.dao.StatsJoueursDao;
import com.example.tch099_em.modele.entite.StatsJoueur;

import org.json.JSONException;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class PresenteurStatsJoueurs {

    private StatsJoueursView view;
    private Modele modele;

    public PresenteurStatsJoueurs(StatsJoueursView view) {
        this.view = view;
        this.modele = ModeleManager.getModele();
    }

    public void obtenirStatsJoueursLigue(int idLigue) {

        view.showLoading();

        new Thread() {
            @Override
            public void run() {
                try {
                    List<StatsJoueur> statsJoueurLigues = StatsJoueursDao.getStatsJoueurLigue(idLigue);

                    if (statsJoueurLigues.isEmpty()) {
                        ((Activity) view).runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                view.afficherMessage("Aucun joueur dans la ligue");
                                view.raffraichirListeJoueurs(true);
                                view.hideLoading();
                            }
                        });
                    } else {

                        Collections.sort(statsJoueurLigues, (b1, b2) -> Integer.compare(b2.getNbButs(), b1.getNbButs()));

                        modele.setStatsJoueurLigues(statsJoueurLigues);

                        ((Activity) view).runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                view.raffraichirListeJoueurs(false);
                                view.hideLoading();
                            }
                        });
                    }
                } catch (JSONException e) {
                    ((Activity) view).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            view.afficherMessage("Problème JSON");
                        }
                    });
                } catch (IOException e) {
                    ((Activity) view).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            view.afficherMessage("Probleme API");
                        }
                    });
                }
            }
        }.start();
    }

    public void obtenirStatsJoueurEquipe(int idEquipe) {

        view.showLoading();

        new Thread() {
            @Override
            public void run() {
                try {
                    List<StatsJoueur> statsJoueursEquipe = StatsJoueursDao.getStatsJoueurEquipe(idEquipe);

                    if (statsJoueursEquipe.isEmpty()) {
                        ((Activity) view).runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                view.raffraichirListeJoueurs(true);
                                view.afficherMessage("Aucun joueur dans l'équipe");
                                view.hideLoading();
                            }
                        });
                    } else {

                        modele.setStatsJoueursEquipe(statsJoueursEquipe);

                        ((Activity) view).runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                view.raffraichirListeJoueurs(false);
                                view.hideLoading();
                            }
                        });
                    }
                } catch (JSONException e) {
                    ((Activity) view).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            view.afficherMessage("Problème JSON");
                        }
                    });
                } catch (IOException e) {
                    ((Activity) view).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            view.afficherMessage("Problème API");
                        }
                    });
                }
            }
        }.start();
    }

    public StatsJoueur getStatsJoueursLigue(int position) {
        return this.modele.getStatsJoueurLigues().get(position);
    }

    public int getNombreStatsJoueurLigue() {
        return this.modele.getStatsJoueurLigues().size();
    }

    public StatsJoueur getStatsJoueursEquipe(int position) {
        return this.modele.getStatsJoueursEquipe().get(position);
    }

    public int getNombreStatsJoueurEquipe() {
        return this.modele.getStatsJoueursEquipe().size();
    }
}
