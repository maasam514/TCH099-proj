package com.example.tch099_em.vue;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.example.tch099_em.R;
import com.example.tch099_em.authentification.UserManager;
import com.example.tch099_em.interfaces.LoginView;
import com.example.tch099_em.modele.entite.User;
import com.example.tch099_em.presenteur.PresenteurLogin;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

public class LoginActivity extends AppCompatActivity implements LoginView, View.OnClickListener {

    private EditText etEmail, etPW;
    private PresenteurLogin presenteurLogin;
    private String email;
    private String password;
    private Button btnConnecter;
    private ImageView imProfile, imJoueur, imCalendar, imStanding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        imProfile = findViewById(R.id.lgProfile);
        imProfile.setColorFilter(getResources().getColor(R.color.white));

        imJoueur = findViewById(R.id.lgPlayer);
        imCalendar = findViewById(R.id.lgCalendar);
        imStanding = findViewById(R.id.lgStanding);

        imJoueur.setOnClickListener(this);
        imCalendar.setOnClickListener(this);
        imStanding.setOnClickListener(this);

        etEmail = findViewById(R.id.etEmail);
        etPW = findViewById(R.id.etPW);
        btnConnecter = findViewById(R.id.btnConnecter);
        btnConnecter.setOnClickListener(this);

        presenteurLogin = new PresenteurLogin(this);
    }

    @Override
    public void loginSuccess() {

        User user = presenteurLogin.getUser();

        if (user!=null) {
            UserManager.getInstance().setUserCourant(user);
            Intent intent = new Intent(this, ProfileActivity.class);
            intent.putExtra("ID_JOUEUR", user.getLoginId());
            startActivity(intent);
        }


    }

    @Override
    public void showError(String message) {
        AlertDialog alertDialog = new AlertDialog.Builder(this)
                .setTitle("Mauvais email ou mot de passe")
                .setMessage("Veuillez réessayer")
                .setPositiveButton("OK", null)
                .create();
        alertDialog.show();
    }

    @Override
    public void onClick(View v) {
        if (v==btnConnecter) {
            email = etEmail.getText().toString();
            password = etPW.getText().toString();
            presenteurLogin.validerLogin(email, password);
        } else if (v==imCalendar) {
            startActivity(new Intent(this, CalendrierActivity.class));
        } else if (v==imJoueur) {
            startActivity(new Intent(this, StatsJoueursActivity.class));
        } else if (v==imStanding) {
            startActivity(new Intent(this, MainActivity.class));
        }
    }
}