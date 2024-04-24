package com.example.tch099_em.modele.dao;

import com.example.tch099_em.modele.entite.User;

import org.json.JSONException;

import java.io.IOException;

public class LoginDao {
    public static User login(String email, String password) throws IOException, JSONException {
        return new HttpJsonService().login(email, password);
    }
}
