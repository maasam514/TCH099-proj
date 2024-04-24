package com.example.tch099_em.vue;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.tch099_em.R;
import com.example.tch099_em.authentification.UserManager;
import com.example.tch099_em.interfaces.StatsJoueursView;
import com.example.tch099_em.modele.entite.StatsEquipe;
import com.example.tch099_em.presenteur.PresenteurStatEquipe;
import com.example.tch099_em.presenteur.PresenteurStatsJoueurs;
import com.example.tch099_em.vue.adaptateur.StatsJoueursAdapter;

public class DetailsEquipeActivity extends AppCompatActivity implements View.OnClickListener, StatsJoueursView {

    private TextView tvNom, tvLigue, tvPJ, tvV, tvD, tvN, tvP;
    private ListView lvJoueurs;
    private PresenteurStatsJoueurs presenteurStatsJoueurs;
    private PresenteurStatEquipe presenteurStatEquipe;
    private ImageView btnRetour;
    private StatsEquipe equipe;
    private StatsJoueursAdapter adapter;
    private ImageView imStandings, imCalendar, imJoueurs, imProfile;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details_equipe);

        tvNom = findViewById(R.id.tvDENom);
        tvLigue = findViewById(R.id.tvDELigue);
        tvPJ = findViewById(R.id.tvdePJ);
        tvV = findViewById(R.id.tvdeV);
        tvD = findViewById(R.id.tvdeD);
        tvN = findViewById(R.id.tvdeN);
        tvP = findViewById(R.id.tvdeP);

        imProfile = findViewById(R.id.deProfile);
        imStandings = findViewById(R.id.deStanding);
        imJoueurs = findViewById(R.id.dePlayer);
        imCalendar = findViewById(R.id.deCalendar);

        imCalendar.setOnClickListener(this);
        imStandings.setOnClickListener(this);
        imJoueurs.setOnClickListener(this);
        imProfile.setOnClickListener(this);

        progressBar = findViewById(R.id.pgDE);

        btnRetour = findViewById(R.id.ivDERetour);
        btnRetour.setOnClickListener(this);

        presenteurStatEquipe = new PresenteurStatEquipe(this);
        presenteurStatsJoueurs = new PresenteurStatsJoueurs(this);

        adapter = new StatsJoueursAdapter(DetailsEquipeActivity.this,
                R.layout.stats_joueurs_layout, presenteurStatsJoueurs);
        adapter.isEquipe(true);

        lvJoueurs = findViewById(R.id.lvDE);

        Intent intent = getIntent();
        String nomEquipe = intent.getStringExtra("NOM_EQUIPE");
        String nomLigue = intent.getStringExtra("NOM_LIGUE");
        equipe = presenteurStatEquipe.getStatsEquipe(nomEquipe);
        if (equipe!=null) {
            tvNom.setText(equipe.getNom());
            tvPJ.setText("PJ\n\n"+equipe.getNbMatch());
            tvV.setText("V\n\n"+equipe.getNbVictoires());
            tvD.setText("D\n\n"+equipe.getNbDefaites());
            tvN.setText("N\n\n"+equipe.getNbNuls());
            tvP.setText("P\n\n"+equipe.getNbPoints());
            tvLigue.setText(nomLigue);
        }

        lvJoueurs.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int i, long id) {
                int idJoueur = presenteurStatsJoueurs.getStatsJoueursEquipe(i).getIdJoueur();
                Intent iDetails = new Intent(DetailsEquipeActivity.this,
                        DetailsJoueurActivity.class);
                iDetails.putExtra("NOM_LIGUE", nomLigue);
                iDetails.putExtra("NOM_EQUIPE", nomEquipe);
                iDetails.putExtra("ID_JOUEUR", idJoueur);
                startActivity(iDetails);
            }
        });
    }

    @Override
    public void onClick(View v) {
        if (v==btnRetour) {
            finish();
        } else if (v==imStandings) {
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
        } else if (v==imCalendar) {
            startActivity(new Intent(this, CalendrierActivity.class));
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        presenteurStatsJoueurs.obtenirStatsJoueurEquipe(getIntent().
                getIntExtra("ID_EQUIPE", 0));
    }

    @Override
    public void raffraichirListeJoueurs(boolean vide) {
        if (vide) {
            lvJoueurs.setAdapter(null);
            adapter.notifyDataSetChanged();
        } else {
            lvJoueurs.setAdapter(adapter);
            adapter.notifyDataSetChanged();
        }

    }

    @Override
    public void afficherMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void showLoading() {
        progressBar.setVisibility(View.VISIBLE);
        lvJoueurs.setVisibility(View.GONE);
    }

    @Override
    public void hideLoading() {
        progressBar.setVisibility(View.GONE);
        lvJoueurs.setVisibility(View.VISIBLE);
    }
}