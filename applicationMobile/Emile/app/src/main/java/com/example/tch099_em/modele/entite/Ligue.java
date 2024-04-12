package com.example.tch099_em.modele.entite;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.gson.annotations.SerializedName;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Ligue {
    @JsonProperty("id_ligue")
    private int id;

    private String nom;

    private String categorie;

    private int annee;

    @JsonProperty("nb_equipe")
    private int nombreEquipes;

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
        return nombreEquipes;
    }

    public void setNombreEquipes(int nombreEquipes) {
        this.nombreEquipes = nombreEquipes;
    }
}
