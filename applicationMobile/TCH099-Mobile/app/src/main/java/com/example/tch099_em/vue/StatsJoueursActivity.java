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
import android.widget.Toast;

import com.example.tch099_em.R;
import com.example.tch099_em.authentification.UserManager;
import com.example.tch099_em.interfaces.LigueView;
import com.example.tch099_em.interfaces.StatsJoueursView;
import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.presenteur.PresenteurLigue;
import com.example.tch099_em.presenteur.PresenteurStatsJoueurs;
import com.example.tch099_em.vue.adaptateur.LigueAdapter;
import com.example.tch099_em.vue.adaptateur.StatsJoueursAdapter;

public class StatsJoueursActivity extends AppCompatActivity implements LigueView, StatsJoueursView, View.OnClickListener{

    private Spinner spinnerLigue;
    private ListView lvSJ;
    private LigueAdapter ligueAdapter;
    private StatsJoueursAdapter statsJoueursAdapter;
    private PresenteurLigue presenteurLigue;
    private PresenteurStatsJoueurs presenteurStatsJoueurs;
    private ImageView imJoueurs, imStandings, imCalendrier, imProfile;
    private ProgressBar progressBar;
    private String nomLigue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stats_joueurs);

        spinnerLigue = findViewById(R.id.spinnerLiguesSJ);
        lvSJ = findViewById(R.id.lvSJ);

        imJoueurs = findViewById(R.id.sjPlayer);
        imJoueurs.setColorFilter(getResources().getColor(R.color.white));

        imStandings = findViewById(R.id.sjStanding);
        imCalendrier = findViewById(R.id.sjCalendar);
        imProfile = findViewById(R.id.sjProfile);

        imStandings.setOnClickListener(this);
        imCalendrier.setOnClickListener(this);
        imProfile.setOnClickListener(this);

        progressBar = findViewById(R.id.pgSJ);

        presenteurLigue = new PresenteurLigue((LigueView) this);
        presenteurStatsJoueurs = new PresenteurStatsJoueurs(this);

        ligueAdapter = new LigueAdapter(StatsJoueursActivity.this,
                android.R.layout.simple_spinner_item, presenteurLigue);
        statsJoueursAdapter = new StatsJoueursAdapter(StatsJoueursActivity.this,
                R.layout.stats_joueurs_layout, presenteurStatsJoueurs);
        statsJoueursAdapter.isEquipe(false);

        spinnerLigue.setAdapter(ligueAdapter);

        spinnerLigue.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

                Ligue selectedLigue = (Ligue) parent.getItemAtPosition(position);
                int idLigue = selectedLigue.getId();
                nomLigue = selectedLigue.getNom();
                presenteurStatsJoueurs.obtenirStatsJoueursLigue(idLigue);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        lvSJ.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int i, long id) {
                int idJoueur = presenteurStatsJoueurs.getStatsJoueursLigue(i).getIdJoueur();
                Intent intent = new Intent(StatsJoueursActivity.this,
                        DetailsJoueurActivity.class);
                intent.putExtra("NOM_LIGUE", nomLigue);
                intent.putExtra("ID_JOUEUR", idJoueur);
                startActivity(intent);
            }
        });
    }

    @Override
    public void raffraichirSpinner() {
        this.ligueAdapter.notifyDataSetChanged();
    }

    public void showLoading() {
        progressBar.setVisibility(View.VISIBLE);
        spinnerLigue.setVisibility(View.GONE);
        lvSJ.setVisibility(View.GONE);
    }

    public void hideLoading() {
        progressBar.setVisibility(View.GONE);
        spinnerLigue.setVisibility(View.VISIBLE);
        lvSJ.setVisibility(View.VISIBLE);
    }

    @Override
    public void raffraichirListeJoueurs(boolean vide) {
        if (vide) {
            lvSJ.setAdapter(null);
        } else {
            lvSJ.setAdapter(statsJoueursAdapter);
            statsJoueursAdapter.notifyDataSetChanged();
        }
    }

    @Override
    public void afficherMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onClick(View v) {
        if (v==imStandings) {
            Intent iStanding = new Intent(this, MainActivity.class);
            startActivity(iStanding);
        } else if (v==imCalendrier) {
            startActivity(new Intent(this, CalendrierActivity.class));
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
}
