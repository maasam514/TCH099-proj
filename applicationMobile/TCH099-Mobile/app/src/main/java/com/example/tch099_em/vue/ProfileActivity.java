package com.example.tch099_em.vue;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.tch099_em.R;
import com.example.tch099_em.interfaces.StatsJoueursView;
import com.example.tch099_em.modele.entite.DetailsJoueur;
import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.modele.entite.StatsEquipe;
import com.example.tch099_em.modele.entite.StatsJoueur;
import com.example.tch099_em.presenteur.PresenteurLigue;
import com.example.tch099_em.presenteur.PresenteurStatEquipe;
import com.example.tch099_em.presenteur.PresenteurStatsJoueurs;

import java.time.LocalDate;
import java.time.Period;

public class ProfileActivity extends AppCompatActivity implements StatsJoueursView, View.OnClickListener {

    private int idJoueur, idLigue;
    private PresenteurStatsJoueurs presenteurStatsJoueurs;
    private PresenteurStatEquipe presenteurStatEquipe;
    private PresenteurLigue presenteurLigue;
    private TextView tvNom, tvLigue, tvEquipe, tvNumero, tvCourriel, tvDate;
    private TextView tvMatch, tvBut, tvPasse, tvCJ, tvCR;
    private ImageView imStanding, imCalendrier, imJoueurs, imProfile;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        idJoueur = getIntent().getIntExtra("ID_JOUEUR", 0);

        tvNom = findViewById(R.id.tvPFNom);
        tvLigue = findViewById(R.id.tvPFLigue);
        tvEquipe = findViewById(R.id.tvPFEquipe);
        tvNumero = findViewById(R.id.tvPFNum);
        tvCourriel = findViewById(R.id.tvPFCourriel);
        tvDate = findViewById(R.id.tvPFDate);
        tvMatch = findViewById(R.id.tvPFMatch);
        tvBut = findViewById(R.id.tvPFBut);
        tvPasse = findViewById(R.id.tvPFPasse);
        tvCJ = findViewById(R.id.tvPFCJ);
        tvCR = findViewById(R.id.tvPFCR);

        imProfile = findViewById(R.id.pfProfile);
        imProfile.setColorFilter(getResources().getColor(R.color.white));

        imStanding = findViewById(R.id.pfStanding);
        imCalendrier = findViewById(R.id.pfCalendar);
        imJoueurs = findViewById(R.id.pfPlayer);

        imStanding.setOnClickListener(this);
        imCalendrier.setOnClickListener(this);
        imJoueurs.setOnClickListener(this);

        presenteurStatsJoueurs = new PresenteurStatsJoueurs(this);
        presenteurStatEquipe = new PresenteurStatEquipe(this);
        presenteurStatsJoueurs.obtenirDetailsJoueur(idJoueur, true);
        presenteurStatsJoueurs.obtenirStatUnJoueur(idJoueur, true, false);
        presenteurLigue = new PresenteurLigue(this);
    }

    public void updateDetailsJoueur (DetailsJoueur detailsJoueur) {
        if (detailsJoueur!=null) {
            tvNom.setText(detailsJoueur.getPrenom()+" "+detailsJoueur.getNom());
            tvNumero.setText("# "+detailsJoueur.getNumero());
            tvCourriel.setText(detailsJoueur.getCourriel());
            tvDate.setText(detailsJoueur.getDateDeNaissance());

            presenteurStatEquipe.obtenirNomEquipe(detailsJoueur.getIdEquipe());
        }
    }

    public void updateNomEquipe (StatsEquipe statsEquipe) {
        if (statsEquipe!=null) {
            tvEquipe.setText(statsEquipe.getNom());
            presenteurLigue.obtenirNomLigue(statsEquipe.getIdLigue());
        }
    }

    public void updateNomLigue(Ligue ligue) {
        tvLigue.setText(ligue.getNom());
    }

    public void updateStatsJoueur(StatsJoueur statsJoueur) {
        tvMatch.setText("PJ\n\n"+statsJoueur.getNbMatch());
        tvBut.setText("B\n\n"+statsJoueur.getNbButs());
        tvPasse.setText("P\n\n"+statsJoueur.getNbPasses());
        tvCJ.setText("CJ\n\n"+statsJoueur.getNbCartonJaune());
        tvCR.setText("CR\n\n"+statsJoueur.getNbCartonRouge());
    }

    @Override
    public void raffraichirListeJoueurs(boolean vide) {

    }

    public void afficherMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void showLoading() {

    }

    @Override
    public void hideLoading() {

    }

    @Override
    public void onClick(View v) {
        if (v==imStanding) {
            startActivity(new Intent(this, MainActivity.class));
        } else if (v==imCalendrier) {
            startActivity(new Intent(this, CalendrierActivity.class));
        } else if (v==imJoueurs) {
            startActivity(new Intent(this, StatsJoueursActivity.class));
        }
    }
}