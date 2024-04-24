package com.example.tch099_em.modele.dao;

import com.example.tch099_em.modele.entite.Game;

import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public class GameDao {
    public static List<Game> getGames(int idLigue) throws IOException, JSONException {
        return new HttpJsonService().getGames(idLigue);
    }
}
