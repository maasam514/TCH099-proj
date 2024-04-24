package com.example.tch099_em.vue.adaptateur;

import android.content.Context;
import android.content.res.Resources;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.tch099_em.R;
import com.example.tch099_em.modele.dao.HttpJsonService;
import com.example.tch099_em.modele.entite.Game;
import com.example.tch099_em.modele.entite.ResultatGame;
import com.example.tch099_em.presenteur.PresenteurGame;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class GameAdapter extends ArrayAdapter {
    private Context contexte;

    private int viewResourceId;
    private Resources resources;
    private PresenteurGame presenteur;
    private OkHttpClient okHttpClient = new OkHttpClient();
    private ObjectMapper mapper = new ObjectMapper();

    public GameAdapter(@NonNull Context context, int resource, PresenteurGame presentateur) {
        super(context, resource);
        this.contexte = context;
        this.viewResourceId = resource;
        this.resources = contexte.getResources();
        this.presenteur = presentateur;
    }

    @Override
    public int getCount() {
        return this.presenteur.getNombreGame();
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View view, @NonNull ViewGroup parent) {
        if (view==null) {
            LayoutInflater layoutInflater = (LayoutInflater) contexte.
                    getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = layoutInflater.inflate(this.viewResourceId, parent, false);
        }
        if (presenteur.getGame(position)!=null) {
            final TextView tvExt = view.findViewById(R.id.tvCalExt);
            final TextView tvDom = view.findViewById(R.id.tvCalDom);
            final TextView tvStade = view.findViewById(R.id.tvCalStade);
            final TextView tvDate = view.findViewById(R.id.tvCalDate);

            Game game = presenteur.getGame(position);
            tvExt.setText(game.getEquipeExt());
            tvDom.setText(game.getEquipeDom());
            tvStade.setText(game.getLieu());
            tvDate.setText(game.getDateGame().substring(0, 10));

            /*
                Va verifier si la partie possede un resultat si oui elle va l'inscrire, sinon non
                Va aussi empêcher qu'une partie fasse cette requete plusieurs fois
            */
            fetchResultats(game.getIdGame(), view);
        }
        return view;
    }

    private void fetchResultats(int idGame, View view) {
        Request request = new Request.Builder().
                url(HttpJsonService.URL_POINT_ENTREE+"resultat/"+idGame).build();
        Log.d("URL", HttpJsonService.URL_POINT_ENTREE+"resultat/"+idGame);
        okHttpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                Game game = presenteur.getGame(idGame, true);

                if (!response.isSuccessful()) {
                    Log.e("GameAdapter", "Non-successful response received for game ID: " + idGame);
                    clearGameResultat(view, game);
                    return;
                }
                final String jsonData = response.body().string();
                if (jsonData.contains("\"error\"")) {
                    clearGameResultat(view, game);
                    return;
                }

                try {
                    ResultatGame resultat = mapper.readValue(jsonData, ResultatGame.class);
                    if (resultat != null) {
                        updateGameResultat(view, resultat);
                    } else {
                        clearGameResultat(view, game);
                    }
                } catch (Exception e) {
                    clearGameResultat(view, game);
                }
            }


        });
    }

    private void updateGameResultat(View view, ResultatGame resultatGame) {
        view.post(new Runnable() {
            @Override
            public void run() {
                TextView tvScoreExt = view.findViewById(R.id.tvCalScoreExt);
                TextView tvScoreDom = view.findViewById(R.id.tvCalScoreDom);
                TextView tvFinal = view.findViewById(R.id.tvCalFinal);
                TextView tvStade = view.findViewById(R.id.tvCalStade);
                TextView tvDate = view.findViewById(R.id.tvCalDate);

                tvStade.setText("");
                tvDate.setText("");

                tvScoreDom.setText(String.valueOf(resultatGame.getScoreEquipeDom()));
                tvScoreExt.setText(String.valueOf(resultatGame.getScoreEquipeExterieur()));
                tvFinal.setText("Final");
            }
        });
    }

    private void clearGameResultat(View view, Game game) {
        view.post(new Runnable() {
            @Override
            public void run() {
                TextView tvScoreExt = view.findViewById(R.id.tvCalScoreExt);
                TextView tvScoreDom = view.findViewById(R.id.tvCalScoreDom);
                TextView tvFinal = view.findViewById(R.id.tvCalFinal);
                TextView tvStade = view.findViewById(R.id.tvCalStade);
                TextView tvDate = view.findViewById(R.id.tvCalDate);


                tvStade.setText(game.getLieu());
                tvDate.setText(game.getDateGame().substring(0, 10));
                tvScoreDom.setText("");
                tvScoreExt.setText("");
                tvFinal.setText("");
            }
        });
    }


}
