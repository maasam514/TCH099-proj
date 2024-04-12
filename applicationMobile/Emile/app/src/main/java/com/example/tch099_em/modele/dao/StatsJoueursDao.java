package com.example.tch099_em.modele.dao;

import com.example.tch099_em.modele.entite.StatsJoueur;

import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public class StatsJoueursDao {
    public static List<StatsJoueur> getStatsJoueurLigue(int idLigue) throws IOException, JSONException {
        return new HttpJsonService().getStatsJoueurLigue(idLigue);
    }

    public static List<StatsJoueur> getStatsJoueurEquipe(int idEquipe) throws IOException, JSONException {
        return new HttpJsonService().getStatsJoueurEquipe(idEquipe);
    }
}
