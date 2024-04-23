package com.example.tch099_em.modele.entite;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StatsJoueur {

    private int idJoueur, nbButs, nbPasses;
    private String prenom, nom;

    public int getIdJoueur() {
        return idJoueur;
    }

    public void setIdJoueur(int idJoueur) {
        this.idJoueur = idJoueur;
    }

    public int getNbButs() {
        return nbButs;
    }

    public void setNbButs(int nbButs) {
        this.nbButs = nbButs;
    }

    public int getNbPasses() {
        return nbPasses;
    }

    public void setNbPasses(int nbPasses) {
        this.nbPasses = nbPasses;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

}
