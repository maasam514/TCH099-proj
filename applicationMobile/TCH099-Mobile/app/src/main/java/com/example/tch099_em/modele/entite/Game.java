package com.example.tch099_em.modele.entite;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Game {
    private int idGame, idLigue, idEquipeDom, idEquipeExt;
    private String dateGame, lieu, equipeDom, equipeExt;

    public int getIdGame() {
        return idGame;
    }

    public void setIdGame(int idGame) {
        this.idGame = idGame;
    }

    public int getIdLigue() {
        return idLigue;
    }

    public void setIdLigue(int idLigue) {
        this.idLigue = idLigue;
    }

    public int getIdEquipeDom() {
        return idEquipeDom;
    }

    public void setIdEquipeDom(int idEquipeDom) {
        this.idEquipeDom = idEquipeDom;
    }

    public int getIdEquipeExt() {
        return idEquipeExt;
    }

    public void setIdEquipeExt(int idEquipeExt) {
        this.idEquipeExt = idEquipeExt;
    }

    public String getDateGame() {
        return dateGame;
    }

    public void setDateGame(String dateGame) {
        this.dateGame = dateGame;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getEquipeDom() {
        return equipeDom;
    }

    public void setEquipeDom(String equipeDom) {
        this.equipeDom = equipeDom;
    }

    public String getEquipeExt() {
        return equipeExt;
    }

    public void setEquipeExt(String equipeExt) {
        this.equipeExt = equipeExt;
    }
}
