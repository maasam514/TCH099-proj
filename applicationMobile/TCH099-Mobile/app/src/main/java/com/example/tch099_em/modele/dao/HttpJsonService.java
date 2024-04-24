package com.example.tch099_em.modele.dao;

import android.util.Log;

import com.example.tch099_em.authentification.JsonUtil;
import com.example.tch099_em.authentification.LoginRequest;
import com.example.tch099_em.authentification.LoginResponse;
import com.example.tch099_em.modele.entite.DetailsJoueur;
import com.example.tch099_em.modele.entite.Game;
import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.modele.entite.ResultatGame;
import com.example.tch099_em.modele.entite.StatsEquipe;
import com.example.tch099_em.modele.entite.StatsJoueur;
import com.example.tch099_em.modele.entite.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class HttpJsonService {
    public static String URL_POINT_ENTREE = "https://tch-099-proj.vercel.app/api/api/";

    public List<Ligue> getLigues() throws IOException, JSONException {

        OkHttpClient okHttpClient = new OkHttpClient();

        Request request = new Request.Builder().url(URL_POINT_ENTREE + "ligues").build();

        Response response = okHttpClient.newCall(request).execute();
        ResponseBody responseBody = response.body();
        String jsonStr = responseBody.string();
        List<Ligue> ligues = null;

        if (jsonStr.length() > 0) {
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
                url(URL_POINT_ENTREE + "ligue/" + idLigue + "/equipes").build();

        Response response = okHttpClient.newCall(request).execute();
        ResponseBody responseBody = response.body();
        String jsonStr = responseBody.string();
        List<StatsEquipe> statistiquesEquipes = null;

        Log.d("Json", URL_POINT_ENTREE + "ligue/" + idLigue + "/equipes");
        Log.d("JSON", jsonStr);

        if (jsonStr.contains("\"error\"")) {
            return Collections.emptyList();
        }

        if (jsonStr.length() > 0) {
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
            int idEquipe = equipe.getIdEquipe();

            Request request = new Request.Builder().
                    url(URL_POINT_ENTREE + "equipe/" + idEquipe + "/joueurs").build();

            Response response = okHttpClient.newCall(request).execute();
            ResponseBody responseBody = response.body();
            String jsonStr = responseBody.string();

            if (jsonStr.contains("\"error\"")) {
                continue;
            }

            if (jsonStr.length() > 0) {
                ObjectMapper mapper = new ObjectMapper();

                try {
                    List<StatsJoueur> statsJoueur = mapper.readValue(jsonStr, new TypeReference<List<StatsJoueur>>() {
                    });

                    statsJoueurLigue.addAll(statsJoueur);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return statsJoueurLigue;
    }

    public List<StatsJoueur> getStatsJoueurEquipe(int idEquipe) throws IOException, JSONException {

        OkHttpClient okHttpClient = new OkHttpClient();

        Request request = new Request.Builder().
                url(URL_POINT_ENTREE + "equipe/" + idEquipe + "/joueurs").build();
        ResponseBody responseBody = okHttpClient.newCall(request).execute().body();
        String jsonStr = responseBody.string();
        List<StatsJoueur> statsJoueurs = null;

        if (jsonStr.contains("\"error\"")) {
            return Collections.emptyList();
        }

        if (jsonStr.length() > 0) {
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

    public DetailsJoueur getDetailsJoueur(int idJoueur) throws IOException, JSONException {
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder().url(URL_POINT_ENTREE + "joueur/" + idJoueur).build();
        ResponseBody responseBody = okHttpClient.newCall(request).execute().body();
        String jsonStr = responseBody.string();
        DetailsJoueur detailsJoueur = null;

        if (jsonStr.length() > 0) {
            ObjectMapper mapper = new ObjectMapper();

            try {
                detailsJoueur = mapper.readValue(jsonStr, DetailsJoueur.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return detailsJoueur;
        }
        return null;
    }

    public User login(String email, String motPasse) {
        OkHttpClient okHttpClient = new OkHttpClient();
        LoginRequest loginRequest = new LoginRequest(email, motPasse);
        String url = URL_POINT_ENTREE + "login";
        User user = null;

        try {
            String jsonStr = JsonUtil.getMapper().writeValueAsString(loginRequest);
            RequestBody requestBody = RequestBody.create(jsonStr, MediaType.parse("application/json"));
            Request request = new Request.Builder().url(url).post(requestBody).build();

            try (Response response = okHttpClient.newCall(request).execute()) {

                if (response.isSuccessful() && response.body() != null) {
                    String jsonResp = response.body().string();
                    LoginResponse loginResponse = JsonUtil.getMapper().readValue(jsonResp, LoginResponse.class);

                    if (loginResponse.getToken() != null && !loginResponse.getToken().isEmpty()) {
                        LoginResponse.Utilisateur utilisateur = loginResponse.getUtilisateur();

                        if (utilisateur != null) {
                            user = new User();
                            user.setIdUser(Integer.parseInt(utilisateur.getId_utilisateur()));
                            user.setLoginId(Integer.parseInt(loginResponse.getId()));
                            user.setEmail(utilisateur.getEmail());
                            user.setToken(loginResponse.getToken());
                            user.setNom(utilisateur.getNom());
                            user.setRole(utilisateur.getRole_utilisateur());
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public StatsEquipe getNomEquipe(int idEquipe) throws IOException, JSONException {
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder().url(URL_POINT_ENTREE+"equipe/"+idEquipe).build();
        ResponseBody responseBody = okHttpClient.newCall(request).execute().body();
        String jsonStr = responseBody.string();
        StatsEquipe nomEquipe = null;

        if (jsonStr.length()>0) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                nomEquipe = mapper.readValue(jsonStr, StatsEquipe.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return nomEquipe;
        }
        return null;
    }

    public Ligue getNomLigue(int idLigue) throws IOException, JSONException {
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder().url(URL_POINT_ENTREE+"ligue/"+idLigue).build();
        ResponseBody responseBody = okHttpClient.newCall(request).execute().body();
        String jsonStr = responseBody.string();
        Log.d("LIGUE", "JSON Response: " + jsonStr);
        Ligue nomLigue = null;

        if (jsonStr.length()>0) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                nomLigue = mapper.readValue(jsonStr, Ligue.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return nomLigue;
        }
        return null;
    }

    public List<Game> getGames(int idLigue) throws IOException, JSONException {
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder().url(URL_POINT_ENTREE+"game/ligue/"+idLigue).build();
        ResponseBody responseBody = okHttpClient.newCall(request).execute().body();
        String jsonStr = responseBody.string();
        List<Game> games = null;

        if (jsonStr.contains("\"error\"")) {
            return Collections.emptyList();
        }

        if (jsonStr.length()>0) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                games = Arrays.asList(mapper.readValue(jsonStr, Game[].class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return games;
        }
        return null;
    }

    public ResultatGame getResultat(int idGame) throws IOException, JSONException {
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder().url(URL_POINT_ENTREE+"resultat/"+idGame).build();
        ResponseBody responseBody = okHttpClient.newCall(request).execute().body();
        String jsonStr = responseBody.string();
        ResultatGame resultatGame = null;

        if (jsonStr.length()>0) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                resultatGame = mapper.readValue(jsonStr, ResultatGame.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return resultatGame;
        }
        return null;
    }

    public StatsJoueur getStatUnJoueur(int idJoueur) throws IOException, JSONException {
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder().
                url(URL_POINT_ENTREE+"statistique/joueur/"+idJoueur).build();
        ResponseBody responseBody = okHttpClient.newCall(request).execute().body();
        String jsonStr = responseBody.string();
        StatsJoueur statsJoueur = null;

        if (jsonStr.length()>0) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                statsJoueur = mapper.readValue(jsonStr, StatsJoueur.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return statsJoueur;
        }
        return null;
    }
}
