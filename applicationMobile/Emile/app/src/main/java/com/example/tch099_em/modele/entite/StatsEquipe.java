package com.example.tch099_em.modele.entite;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StatsEquipe {

    @JsonProperty("id_equipe")
    private int id;

    private String nom;

    @JsonProperty("id_ligue")
    private int idLigue;

    @JsonProperty("nb_victoire")
    private int nbVictoire;

    @JsonProperty("nb_defaite")
    private int nbDefaite;

    @JsonProperty("nb_nul")
    private int nbNul;

    @JsonProperty("nb_point")
    private int nbPoint;

    @JsonProperty("nb_game")
    private int nbMatch;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getIdLigue() {
        return idLigue;
    }

    public void setIdLigue(int idLigue) {
        this.idLigue = idLigue;
    }

    public int getNbVictoire() {
        return nbVictoire;
    }

    public void setNbVictoire(int nbVictoire) {
        this.nbVictoire = nbVictoire;
    }

    public int getNbDefaite() {
        return nbDefaite;
    }

    public void setNbDefaite(int nbDefaite) {
        this.nbDefaite = nbDefaite;
    }

    public int getNbNul() {
        return nbNul;
    }

    public void setNbNul(int nbNul) {
        this.nbNul = nbNul;
    }

    public int getNbMatch() {
        return nbMatch;
    }

    public void setNbMatch(int nbMatch) {
        this.nbMatch = nbMatch;
    }

    public int getNbPoint() {
        return nbPoint;
    }

    public void setNbPoint(int nbPoint) {
        this.nbPoint = nbPoint;
    }
}
