package com.example.tch099_em.modele.dao;

import com.example.tch099_em.modele.entite.StatsEquipe;

import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public class StatsEquipeDao {
    public static List<StatsEquipe> getStatsEquipe(int idLigue) throws IOException, JSONException {
        return new HttpJsonService().getStatsEquipe(idLigue);
    }
    public static StatsEquipe getNomEquipe(int idEquipe) throws IOException, JSONException {
        return new HttpJsonService().getNomEquipe(idEquipe);
    }
}
