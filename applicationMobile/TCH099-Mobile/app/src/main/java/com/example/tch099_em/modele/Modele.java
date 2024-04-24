package com.example.tch099_em.modele;

import com.example.tch099_em.modele.entite.DetailsJoueur;
import com.example.tch099_em.modele.entite.Game;
import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.modele.entite.StatsEquipe;
import com.example.tch099_em.modele.entite.StatsJoueur;
import com.example.tch099_em.modele.entite.User;

import java.util.ArrayList;
import java.util.List;

public class Modele {
    private List<Ligue> ligues = new ArrayList<>();
    private List<StatsEquipe> statistiquesEquipes = new ArrayList<>();
    private List<StatsJoueur> statsJoueurLigues = new ArrayList<>();
    private List<StatsJoueur> statsJoueursEquipe = new ArrayList<>();
    private DetailsJoueur detailsJoueur;
    private User user;
    private StatsEquipe nomEquipe;
    private List<Game> games = new ArrayList<>();
    private StatsJoueur statsUnJoueur;

    public List<Ligue> getLigues() {
        return this.ligues;
    }

    public void setLigues(List<Ligue> ligues) {
        this.ligues = ligues;
    }

    public Ligue getLigue(String nom) {
        for (Ligue lgu : this.ligues)
            if (lgu.getNom().equals(nom))
                return lgu;
        return null;
    }

    public List<StatsEquipe> getStatistiquesEquipes() {
        return this.statistiquesEquipes;
    }

    public void setStatistiquesEquipes(List<StatsEquipe> statistiquesEquipes) {
        this.statistiquesEquipes = statistiquesEquipes;
    }

    public StatsEquipe getStatiquesEquipe(String nomEquipe) {
        for (StatsEquipe ste : this.statistiquesEquipes) {
            if (ste.getNom().equals(nomEquipe)) {
                return ste;
            }
        }
        return null;
    }

    public Game getGameAvecId(int id) {

        for (Game game : games) {
            if (game.getIdGame() == id) {
                return game;
            }
        }
        return null;
    }

    public List<StatsJoueur> getStatsJoueurLigues() {
        return this.statsJoueurLigues;
    }

    public void setStatsJoueurLigues(List<StatsJoueur> statsJoueurLigues) {
        this.statsJoueurLigues = statsJoueurLigues;
    }

    public List<StatsJoueur> getStatsJoueursEquipe() {
        return statsJoueursEquipe;
    }

    public void setStatsJoueursEquipe(List<StatsJoueur> statsJoueursEquipe) {
        this.statsJoueursEquipe = statsJoueursEquipe;
    }

    public DetailsJoueur getDetailsJoueur() {
        return detailsJoueur;
    }

    public void setDetailsJoueur(DetailsJoueur detailsJoueur) {
        this.detailsJoueur = detailsJoueur;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public StatsEquipe getNomEquipe() {
        return nomEquipe;
    }

    public void setNomEquipe(StatsEquipe nomEquipe) {
        this.nomEquipe = nomEquipe;
    }

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }

    public StatsJoueur getStatsUnJoueur() {
        return statsUnJoueur;
    }

    public void setStatsUnJoueur(StatsJoueur statsUnJoueur) {
        this.statsUnJoueur = statsUnJoueur;
    }
}
