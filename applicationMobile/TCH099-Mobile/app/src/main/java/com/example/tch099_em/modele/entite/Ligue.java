package com.example.tch099_em.modele.entite;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.gson.annotations.SerializedName;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Ligue {
    @JsonProperty("idLigue")
    private int idLigue;

    @JsonProperty("nomLigue")
    private String nom;

    @JsonProperty("categorie")
    private String categorie;

    @JsonProperty("annee")
    private int annee;

    @JsonProperty("nbEquipes")
    private int nbEquipes;

    @JsonProperty("idGestionnaire")
    private int idGestionnaire;


    public int getId() {
        return idLigue;
    }

    public void setId(int id) {
        this.idLigue = id;
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

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public int getNombreEquipes() {
        return nbEquipes;
    }

    public void setNombreEquipes(int nombreEquipes) {
        this.nbEquipes = nombreEquipes;
    }

    public int getIdGestionnaire() {
        return idGestionnaire;
    }

    public void setIdGestionnaire(int idGestionnaire) {
        this.idGestionnaire = idGestionnaire;
    }
}
