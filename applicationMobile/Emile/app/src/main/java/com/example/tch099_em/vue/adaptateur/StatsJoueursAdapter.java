package com.example.tch099_em.vue.adaptateur;

import android.content.Context;
import android.content.res.Resources;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.tch099_em.R;
import com.example.tch099_em.modele.entite.StatsJoueur;
import com.example.tch099_em.presenteur.PresenteurStatsJoueurs;

public class StatsJoueursAdapter extends ArrayAdapter {

    private Context contexte;
    private int viewResourceId;
    private Resources resources;
    private PresenteurStatsJoueurs presenteur;
    private boolean isEquipe = false;

    public StatsJoueursAdapter(@NonNull Context context, int resource, PresenteurStatsJoueurs presentateur) {
        super(context, resource);
        this.contexte = context;
        this.viewResourceId = resource;
        this.resources = contexte.getResources();
        this.presenteur = presentateur;
    }

    public void isEquipe(boolean equipe) {
        this.isEquipe = equipe;
    }

    @Override
    public int getCount() {
        if (isEquipe) {
            return presenteur.getNombreStatsJoueurEquipe();
        } else {
            return this.presenteur.getNombreStatsJoueurLigue();
        }
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View view, @NonNull ViewGroup parent) {

        if (view == null) {
            LayoutInflater layoutInflater = (LayoutInflater) contexte.getSystemService(Context.
                    LAYOUT_INFLATER_SERVICE);
            view = layoutInflater.inflate(this.viewResourceId, parent, false);
        }

        StatsJoueur statsJoueur;

        if (isEquipe) {
            statsJoueur = presenteur.getStatsJoueursEquipe(position);
        } else {
            statsJoueur = presenteur.getStatsJoueursLigue(position);
        }

        final TextView tvNom = view.findViewById(R.id.tvNomSJ);
        final TextView tvB = view.findViewById(R.id.tvBSJ);
        final TextView tvA = view.findViewById(R.id.tvASJ);
        final TextView tvPJ = view.findViewById(R.id.tvPJSJ);

        tvNom.setText(statsJoueur.getPrenom() + " " + statsJoueur.getNom());
        tvB.setText(Integer.toString(statsJoueur.getNbButs()));
        tvA.setText(Integer.toString(statsJoueur.getNbPasses()));
        tvPJ.setText("-");

        return view;
    }
}
