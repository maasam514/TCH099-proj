package com.example.tch099_em.vue;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.tch099_em.R;
import com.example.tch099_em.authentification.UserManager;
import com.example.tch099_em.interfaces.LigueView;
import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.presenteur.PresenteurGame;
import com.example.tch099_em.presenteur.PresenteurLigue;
import com.example.tch099_em.vue.adaptateur.GameAdapter;
import com.example.tch099_em.vue.adaptateur.LigueAdapter;

public class CalendrierActivity extends AppCompatActivity implements LigueView, View.OnClickListener {
    private Spinner spLigues;
    private ProgressBar progressBar;
    private TextView tvCache;
    private PresenteurLigue presenteurLigue;
    private PresenteurGame presenteurGame;
    private LigueAdapter ligueAdapter;
    private GameAdapter gameAdapter;
    private ListView lvGames;
    private ImageView imCal, imAcc, imJoueurs, imProfile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendrier);

        tvCache = findViewById(R.id.calCache);
        progressBar = findViewById(R.id.calPg);

        // Cache la liste pendant trois secondes pour que les elements se charge
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                tvCache.setVisibility(View.GONE);
                progressBar.setVisibility(View.GONE);
            }
        }, 3000);

        spLigues = findViewById(R.id.spLigueCal);
        lvGames = findViewById(R.id.lvCalGame);
        imCal = findViewById(R.id.calCalendar);
        imCal.setColorFilter(getResources().getColor(R.color.white));
        imProfile = findViewById(R.id.calProfile);
        imAcc = findViewById(R.id.calStanding);
        imJoueurs = findViewById(R.id.calPlayer);

        imProfile.setOnClickListener(this);
        imJoueurs.setOnClickListener(this);
        imAcc.setOnClickListener(this);

        presenteurLigue = new PresenteurLigue((LigueView) this);
        presenteurGame = new PresenteurGame(this);

        ligueAdapter = new LigueAdapter(CalendrierActivity.this,
                android.R.layout.simple_spinner_item, presenteurLigue);
        spLigues.setAdapter(ligueAdapter);

        gameAdapter = new GameAdapter(this, R.layout.game_layout, presenteurGame);
        lvGames.setAdapter(gameAdapter);



        spLigues.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                Ligue selectedLigue = (Ligue)parent.getItemAtPosition(position);
                int idLigue = selectedLigue.getId();
                presenteurGame.obtenirGames(idLigue);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        this.presenteurLigue.obtenirLigues();
    }

    @Override
    public void onClick(View v) {
        if (v==imAcc) {
            startActivity(new Intent(this, MainActivity.class));
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
    @Override
    public void raffraichirSpinner() {
        ligueAdapter.notifyDataSetChanged();
    }

    @Override
    public void afficherMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void showLoading() {

    }

    @Override
    public void hideLoading() {

    }

    public void raffraichirGames(boolean vide) {
        if (vide) {
            lvGames.setAdapter(null);
        }
        else {
            lvGames.setAdapter(gameAdapter);
            gameAdapter.notifyDataSetChanged();
        }
    }

}