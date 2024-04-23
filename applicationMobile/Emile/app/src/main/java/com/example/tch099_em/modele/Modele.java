package com.example.tch099_em.modele;

import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.modele.entite.StatsEquipe;
import com.example.tch099_em.modele.entite.StatsJoueur;

import java.util.ArrayList;
import java.util.List;

public class Modele {
    private List<Ligue> ligues = new ArrayList<>();
    private List<StatsEquipe> statistiquesEquipes = new ArrayList<>();
    private List<StatsJoueur> statsJoueurLigues = new ArrayList<>();
    private List<StatsJoueur> statsJoueursEquipe = new ArrayList<>();

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
}
