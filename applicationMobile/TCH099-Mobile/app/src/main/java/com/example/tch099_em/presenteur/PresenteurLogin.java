package com.example.tch099_em.presenteur;

import android.app.Activity;
import android.util.Log;

import com.example.tch099_em.interfaces.LoginView;
import com.example.tch099_em.modele.Modele;
import com.example.tch099_em.modele.ModeleManager;
import com.example.tch099_em.modele.dao.LoginDao;
import com.example.tch099_em.modele.entite.User;

import org.json.JSONException;

import java.io.IOException;

public class PresenteurLogin {
    private LoginView view;
    private Modele modele;

    public PresenteurLogin(LoginView view) {
        this.view = view;
        this.modele = ModeleManager.getModele();
    }

    public void validerLogin(String email, String password) {
        new Thread(() -> {
            try {
                User user = LoginDao.login(email, password);
                if (user != null && user.getToken() != null) {
                    modele.setUser(user);
                    Log.d("LOGIN", modele.getUser().getToken());
                    ((Activity)view).runOnUiThread(() -> view.loginSuccess());
                } else {
                    ((Activity)view).runOnUiThread(() -> view.showError("Mauvais identifiant"));
                }
            } catch (IOException e) {
                ((Activity) view).runOnUiThread(() -> view.showError("Probleme API"));
            } catch (JSONException e) {
                ((Activity) view).runOnUiThread(() -> view.showError("Probleme JSON"));
            }
        }).start();
    }

    public User getUser() {
        return modele.getUser();
    }
}
