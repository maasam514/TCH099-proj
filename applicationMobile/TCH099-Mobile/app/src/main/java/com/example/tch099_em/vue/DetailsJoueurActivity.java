package com.example.tch099_em.vue;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.tch099_em.R;
import com.example.tch099_em.authentification.UserManager;
import com.example.tch099_em.interfaces.StatsJoueursView;
import com.example.tch099_em.modele.entite.DetailsJoueur;
import com.example.tch099_em.modele.entite.StatsJoueur;
import com.example.tch099_em.presenteur.PresenteurStatsJoueurs;

public class DetailsJoueurActivity extends AppCompatActivity implements StatsJoueursView, View.OnClickListener {
    private PresenteurStatsJoueurs presenteurStatsJoueurs;
    private TextView tvNom, tvNumero, tvLigue, tvEquipe, tvCourriel, tvNaissance;
    private TextView tvMatch, tvBut, tvPasse, tvCJ, tvCR;
    private String nomLigue, nomEquipe;
    private ImageView imBack, imStanding, imCalendrier, imJoueurs, imProfile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details_joueur);

        tvNom = findViewById(R.id.tvDJNom);
        tvLigue = findViewById(R.id.tvDJLigue);
        tvNumero= findViewById(R.id.tvDJNum);
        tvEquipe = findViewById(R.id.tvDJEquipe);
        tvCourriel = findViewById(R.id.tvDJCourriel);
        tvNaissance = findViewById(R.id.tvDJNais);
        tvMatch = findViewById(R.id.tvDJMatch);
        tvBut = findViewById(R.id.tvDJBut);
        tvPasse = findViewById(R.id.tvDJPasse);
        tvCJ = findViewById(R.id.tvDJCJ);
        tvCR = findViewById(R.id.tvDJCR);

        imStanding = findViewById(R.id.djStanding);
        imCalendrier = findViewById(R.id.djCalendar);
        imJoueurs = findViewById(R.id.djPlayer);
        imProfile = findViewById(R.id.djProfile);

        imStanding.setOnClickListener(this);
        imCalendrier.setOnClickListener(this);
        imJoueurs.setOnClickListener(this);
        imProfile.setOnClickListener(this);

        imBack = findViewById(R.id.imDJRetour);
        imBack.setOnClickListener(this);

        Intent intent = this.getIntent();
        nomLigue = intent.getStringExtra("NOM_LIGUE");
        nomEquipe = intent.getStringExtra("NOM_EQUIPE");
        int idJoueur = intent.getIntExtra("ID_JOUEUR", 0);

        presenteurStatsJoueurs = new PresenteurStatsJoueurs(this);
        presenteurStatsJoueurs.obtenirDetailsJoueur(idJoueur, false);
        presenteurStatsJoueurs.obtenirStatUnJoueur(idJoueur, false, true);

    }

    public void updateDetailsJoueur (DetailsJoueur detailsJoueur) {
        if (detailsJoueur != null) {
            tvLigue.setText(nomLigue);
            tvEquipe.setText(nomEquipe);
            tvNom.setText(detailsJoueur.getPrenom() + " " + detailsJoueur.getNom());
            tvCourriel.setText(detailsJoueur.getCourriel());
            tvNaissance.setText(detailsJoueur.getDateDeNaissance());
            tvNumero.setText("# "+detailsJoueur.getNumero());
        } else {
            afficherMessage("Détails du joueur non disponibles");
        }
    }


    @Override
    public void onClick(View v) {
        if (v==imBack) {
            finish();
        } else if (v==imStanding) {
            startActivity(new Intent(this, MainActivity.class));
        } else if (v==imCalendrier) {
            startActivity(new Intent(this, CalendrierActivity.class));
        } else if (v==imJoueurs) {
            startActivity(new Intent(this, StatsJoueursActivity.class));
        } else if (v==imProfile) {
            if (UserManager.getInstance().estConnecte()) {
                Intent iProfile = new Intent(this, ProfileActivity.class);
                iProfile.putExtra("ID_JOUEUR", UserManager.getInstance().getUserCourant().getLoginId());
                startActivity(iProfile);
            } else {
                Intent iLogin = new Intent(this, LoginActivity.class);
                startActivity(iLogin);
            }
        }
    }

    public void updateStatsJoueur(StatsJoueur statsJoueur) {
        if (statsJoueur!=null) {
            tvMatch.setText("PJ\n\n"+statsJoueur.getNbMatch());
            tvBut.setText("B\n\n"+statsJoueur.getNbButs());
            tvPasse.setText("P\n\n"+statsJoueur.getNbPasses());
            tvCJ.setText("CJ\n\n"+statsJoueur.getNbCartonJaune());
            tvCR.setText("CR\n\n"+statsJoueur.getNbCartonRouge());
        }
    }

    public void raffraichirListeJoueurs(boolean vide) {

    }

    @Override
    public void afficherMessage(String message) {

    }

    @Override
    public void showLoading() {

    }

    @Override
    public void hideLoading() {

    }
}