package com.example.tch099_em.modele.dao;

import com.example.tch099_em.modele.entite.Ligue;

import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public class LigueDao {
    public static List<Ligue> getLigues() throws IOException, JSONException {
        return new HttpJsonService().getLigues();
    }
}
