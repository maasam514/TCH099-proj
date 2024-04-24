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
import com.example.tch099_em.presenteur.PresenteurStatEquipe;

public class StatsEquipeAdapter extends ArrayAdapter {

    private Context contexte;

    private int viewResourceId;
    private Resources resources;
    private PresenteurStatEquipe presenteur;

    public StatsEquipeAdapter(@NonNull Context context, int resource, PresenteurStatEquipe presentateur) {
        super(context, resource);
        this.contexte = context;
        this.viewResourceId = resource;
        this.resources = contexte.getResources();
        this.presenteur = presentateur;
    }

    @Override
    public int getCount() {
        return this.presenteur.getNombreStatsEquipe();
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View view, @NonNull ViewGroup parent) {

        if (view==null) {
            LayoutInflater layoutInflater = (LayoutInflater) contexte.getSystemService(Context.
                    LAYOUT_INFLATER_SERVICE);
            view = layoutInflater.inflate(this.viewResourceId, parent, false);
        }

        if (presenteur.getStatsEquipe(position) != null) {
            final TextView tvNom = view.findViewById(R.id.tvNomEquipe);
            final TextView tvPJ = view.findViewById(R.id.tvPJ);
            final TextView tvV = view.findViewById(R.id.tvV);
            final TextView tvD = view.findViewById(R.id.tvD);
            final TextView tvN = view.findViewById(R.id.tvN);
            final TextView tvP = view.findViewById(R.id.tvP);

            tvNom.setText(presenteur.getStatsEquipe(position).getNom());
            tvPJ.setText(Integer.toString(presenteur.getStatsEquipe(position).getNbMatch()));
            tvV.setText(Integer.toString(presenteur.getStatsEquipe(position).getNbVictoires()));
            tvD.setText(Integer.toString(presenteur.getStatsEquipe(position).getNbDefaites()));
            tvN.setText(Integer.toString(presenteur.getStatsEquipe(position).getNbNuls()));
            tvP.setText(Integer.toString(presenteur.getStatsEquipe(position).getNbPoints()));
        }
        return view;
    }
}
