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

import com.example.tch099_em.modele.entite.Ligue;
import com.example.tch099_em.presenteur.PresenteurLigue;

public class LigueAdapter extends ArrayAdapter {
    private Context contexte;

    private int viewResourceId;
    private Resources resources;
    private PresenteurLigue presenteur;

    public LigueAdapter(@NonNull Context context, int resource, PresenteurLigue presentateur) {
        super(context, resource);
        this.contexte = context;
        this.viewResourceId = resource;
        this.resources = contexte.getResources();
        this.presenteur = presentateur;
    }

    @Override
    public int getCount() {
        return this.presenteur.getNombreLigues();
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(contexte).inflate(android.R.layout.simple_spinner_item, parent, false);
        }
        TextView textView = convertView.findViewById(android.R.id.text1);
        Ligue item = getItem(position);
        if (item != null) {
            textView.setText(item.getNom());
        }
        return convertView;
    }

    @Override
    public View getDropDownView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(contexte).inflate(android.R.layout.simple_spinner_dropdown_item, parent, false);
        }
        TextView textView = convertView.findViewById(android.R.id.text1);
        Ligue item = getItem(position);
        if (item != null) {
            textView.setText(item.getNom());
        }
        return convertView;
    }

    @Nullable
    @Override
    public Ligue getItem(int position) {
        return presenteur.getListeLigues().get(position);
    }
}
