package com.example.tch099_em.modele.entite;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StatsEquipe {

    @JsonProperty("idEquipe")
    private int idEquipe;

    @JsonProperty("nom")
    private String nom;

    @JsonProperty("categorie")
    private String categorie;

    @JsonProperty("idLigue")
    private int idLigue;

    @JsonProperty("nbJoueurs")
    private Integer nbJoueurs;

    @JsonProperty("nbVictoires")
    private int nbVictoires;

    @JsonProperty("nbDefaites")
    private int nbDefaites;

    @JsonProperty("nbNuls")
    private int nbNuls;

    @JsonProperty("nbPoints")
    private int nbPoints;

    @JsonProperty("nbButsPour")
    private int nbButsPour;

    @JsonProperty("nbButsContre")
    private int nbButsContre;

    @JsonProperty("nbMatch")
    private int nbMatch;


    public int getIdEquipe() {
        return idEquipe;
    }

    public void setIdEquipe(int idEquipe) {
        this.idEquipe = idEquipe;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public int getIdLigue() {
        return idLigue;
    }

    public void setIdLigue(int idLigue) {
        this.idLigue = idLigue;
    }

    public Integer getNbJoueurs() {
        return nbJoueurs;
    }

    public void setNbJoueurs(Integer nbJoueurs) {
        this.nbJoueurs = nbJoueurs;
    }

    public int getNbVictoires() {
        return nbVictoires;
    }

    public void setNbVictoires(int nbVictoires) {
        this.nbVictoires = nbVictoires;
    }

    public int getNbDefaites() {
        return nbDefaites;
    }

    public void setNbDefaites(int nbDefaites) {
        this.nbDefaites = nbDefaites;
    }

    public int getNbNuls() {
        return nbNuls;
    }

    public void setNbNuls(int nbNuls) {
        this.nbNuls = nbNuls;
    }

    public int getNbPoints() {
        return nbPoints;
    }

    public void setNbPoints(int nbPoints) {
        this.nbPoints = nbPoints;
    }

    public int getNbButsPour() {
        return nbButsPour;
    }

    public void setNbButsPour(int nbButsPour) {
        this.nbButsPour = nbButsPour;
    }

    public int getNbButsContre() {
        return nbButsContre;
    }

    public void setNbButsContre(int nbButsContre) {
        this.nbButsContre = nbButsContre;
    }

    public int getNbMatch() {
        return nbMatch;
    }

    public void setNbMatch(int nbMatch) {
        this.nbMatch = nbMatch;
    }
}
