package com.example.tch099_em.vue;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
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
import com.example.tch099_em.modele.ModeleManager;
import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.presenteur.PresenteurLigue;
import com.example.tch099_em.presenteur.PresenteurStatEquipe;
import com.example.tch099_em.vue.adaptateur.LigueAdapter;
import com.example.tch099_em.vue.adaptateur.StatsEquipeAdapter;

public class MainActivity extends AppCompatActivity implements LigueView, View.OnClickListener {

    private Spinner spLigues;
    private PresenteurLigue presenteurLigue;
    private PresenteurStatEquipe presenteurStatEquipe;
    private LigueAdapter adaptateurLigue;
    private StatsEquipeAdapter adaptateurStandings;
    private ListView lvStats;
    private ProgressBar progressBar;
    private ImageView standings;
    private ImageView joueurs, login, calendrier;
    private String nomLigueSelect;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progressBar = findViewById(R.id.pgAcc);
        standings = findViewById(R.id.accStanding);
        standings.setColorFilter(getResources().getColor(R.color.white));

        joueurs = findViewById(R.id.accPlayer);
        login = findViewById(R.id.accProfile);
        calendrier = findViewById(R.id.accCalendar);

        spLigues = findViewById(R.id.spinnerLiguesAcc);
        lvStats = findViewById(R.id.lvStatEquipe);

        presenteurStatEquipe = new PresenteurStatEquipe(this);
        presenteurLigue = new PresenteurLigue((LigueView) this);

        adaptateurStandings = new StatsEquipeAdapter(MainActivity.this, R.layout.standing_layout, presenteurStatEquipe);
        adaptateurLigue = new LigueAdapter(MainActivity.this, android.R.layout.simple_spinner_item, presenteurLigue);

        spLigues.setAdapter(adaptateurLigue);

        spLigues.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

                Ligue selectedLigue = (Ligue) parent.getItemAtPosition(position);
                int ligueId = selectedLigue.getId();
                presenteurStatEquipe.obtenirStatsEquipes(ligueId);
                nomLigueSelect = selectedLigue.getNom();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        joueurs.setOnClickListener(this);
        login.setOnClickListener(this);
        calendrier.setOnClickListener(this);

        lvStats.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent iDetailsEquipe = new Intent(MainActivity.this, DetailsEquipeActivity.class);
                String nomEquipe = String.valueOf(presenteurStatEquipe.getStatsEquipe(i).getNom());
                int idEquipe = Integer.valueOf(presenteurStatEquipe.getStatsEquipe(i).getIdEquipe());
                iDetailsEquipe.putExtra("NOM_EQUIPE", nomEquipe);
                iDetailsEquipe.putExtra("NOM_LIGUE", nomLigueSelect);
                iDetailsEquipe.putExtra("ID_EQUIPE", idEquipe);
                startActivity(iDetailsEquipe);
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        this.presenteurLigue.obtenirLigues();
    }

    public void showLoading() {
        progressBar.setVisibility(View.VISIBLE);
        spLigues.setVisibility(View.GONE);
        lvStats.setVisibility(View.GONE);
    }

    public void hideLoading() {
        progressBar.setVisibility(View.GONE);
        spLigues.setVisibility(View.VISIBLE);
        lvStats.setVisibility(View.VISIBLE);
    }

    public void raffraichirSpinner() {
        adaptateurLigue.notifyDataSetChanged();
    }

    public void afficherMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    public void raffraichirListStats(boolean vide) {
        if (vide) {
            lvStats.setAdapter(null);
        }
        else {
            lvStats.setAdapter(adaptateurStandings);
            adaptateurStandings.notifyDataSetChanged();
        }
    }

    @Override
    public void onClick(View v) {
        if (v==joueurs) {
            Intent iJoueurs = new Intent(this, StatsJoueursActivity.class);
            startActivity(iJoueurs);
        } else if (v==login) {
            if (UserManager.getInstance().estConnecte()) {
                Intent iProfile = new Intent(this, ProfileActivity.class);
                iProfile.putExtra("ID_JOUEUR", UserManager.getInstance().getUserCourant().getLoginId());
                startActivity(iProfile);
            } else {
                Intent iLogin = new Intent(this, LoginActivity.class);
                startActivity(iLogin);
            }
        } else if (v==calendrier) {
            Intent iCalendrier = new Intent(this, CalendrierActivity.class);
            startActivity(iCalendrier);
        }
    }
}