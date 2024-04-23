package com.example.tch099_em.modele.dao;

import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.modele.entite.StatsEquipe;
import com.example.tch099_em.modele.entite.StatsJoueur;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class HttpJsonService {
    private static String URL_POINT_ENTREE = "https://tch-099-proj.vercel.app/api/api";

    public List<Ligue> getLigues() throws IOException, JSONException {

        OkHttpClient okHttpClient = new OkHttpClient();

        Request request = new Request.Builder().url(URL_POINT_ENTREE+"/ligues").build();

        Response response = okHttpClient.newCall(request).execute();
        ResponseBody responseBody = response.body();
        String jsonStr = responseBody.string();
        List<Ligue> ligues = null;

        if (jsonStr.length()>0) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                ligues = Arrays.asList(mapper.readValue(jsonStr, Ligue[].class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return ligues;
        }
        return null;
    }

    public List<StatsEquipe> getStatsEquipe(int idLigue) throws IOException, JSONException {

        OkHttpClient okHttpClient = new OkHttpClient();

        Request request = new Request.Builder().
                url(URL_POINT_ENTREE+"/ligue/"+idLigue+"/equipes").build();

        Response response = okHttpClient.newCall(request).execute();
        ResponseBody responseBody = response.body();
        String jsonStr = responseBody.string();
        List<StatsEquipe> statistiquesEquipes = null;

        if (jsonStr.contains("\"error\"")) {
            return Collections.emptyList();
        }

        if (jsonStr.length()>0) {
            ObjectMapper mapper = new ObjectMapper();

            try {
                statistiquesEquipes = Arrays.asList(mapper.readValue(jsonStr,
                        StatsEquipe[].class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return statistiquesEquipes;
        }
        return null;
    }

    public List<StatsJoueur> getStatsJoueurLigue(int idLigue) throws IOException, JSONException {

        List<StatsEquipe> equipes = this.getStatsEquipe(idLigue);
        List<StatsJoueur> statsJoueurLigue = new ArrayList<>();

        OkHttpClient okHttpClient = new OkHttpClient();

        for (StatsEquipe equipe : equipes) {
            int idEquipe = equipe.getId();

            Request request = new Request.Builder().
                    url(URL_POINT_ENTREE+"/equipe/"+idEquipe+"/joueurs").build();

            Response response = okHttpClient.newCall(request).execute();
            ResponseBody responseBody = response.body();
            String jsonStr = responseBody.string();

            if (jsonStr.contains("\"error\"")) {
                continue;
            }

            if (jsonStr.length()>0) {
                ObjectMapper mapper = new ObjectMapper();

                try {
                    List<StatsJoueur> statsJoueur = mapper.readValue(jsonStr, new TypeReference<List<StatsJoueur>>() {});

                    statsJoueurLigue.addAll(statsJoueur);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return statsJoueurLigue;
    }

    public List<StatsJoueur> getStatsJoueurEquipe(int idEquipe) throws IOException, JSONException{

        OkHttpClient okHttpClient = new OkHttpClient();

        Request request = new Request.Builder().
                url(URL_POINT_ENTREE+"/equipe/"+idEquipe+"/joueurs").build();
        ResponseBody responseBody = okHttpClient.newCall(request).execute().body();
        String jsonStr = responseBody.string();
        List<StatsJoueur> statsJoueurs = null;

        if (jsonStr.contains("\"error\"")) {
            return Collections.emptyList();
        }

        if (jsonStr.length()>0) {
            ObjectMapper mapper = new ObjectMapper();

            try {
                statsJoueurs = Arrays.asList(mapper.readValue(jsonStr, StatsJoueur[].class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return statsJoueurs;
        }
        return null;
    }
}
