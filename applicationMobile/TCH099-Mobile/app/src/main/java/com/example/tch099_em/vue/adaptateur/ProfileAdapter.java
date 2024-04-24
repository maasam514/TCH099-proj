/*

Adaptateur pour l'intégration de calendrier dans le profile - Sam

package vue.adaptateur;

import android.content.Context;
import android.content.res.Resources;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;



import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import modele.entite.Joueur;
import presenter.PresentateurProfile;

public class ProfileAdaptateur extends ArrayAdapter {
    private Context context;
    private int viewResourceId;
    private Resources resources;
    private PresentateurProfile presentateurProfile;
    ListView futurMatchsListView;

    public ProfileAdaptateur(@NonNull Context context, int resource, PresentateurProfile presentateurProfile){
        super(context,resource);
        this.context=context;
        this.viewResourceId = resource;
        this.resources = context.getResources();
        this.presentateurProfile = presentateurProfile;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public View getView(int position, @Nullable View view, @NonNull ViewGroup parent)
    {
        if (view == null)
        {
            LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
            view = layoutInflater.inflate(this.viewResourceId,parent,false);
        }
        if (presentateurProfile.getJoueurParPosition(position) !=null)
        {
            LocalDate currentDate = LocalDate.now();

            List<Games> games = presentateurProfile.getGames();
            List<Games> pastGames = new ArrayList<>();
            List<Games> futurGames = new ArrayList<>();

            for (Games game :games){
                String gameDateStr = game.getDate();
                LocalDate gameDate = LocalDate.parse(gameDateStr);
                if (gameDate.isBefore(currentDate) && pastGames.size()<5){
                    pastGames.add(game);
                }
            }
            for (Games game :games){
                String gameDateStr = game.getDate();
                LocalDate gameDate = LocalDate.parse(gameDateStr);
                if (gameDate.isAfter(currentDate)){
                    futurGames.add(game);
                }
            }


            int idJoueur=1;//temporaire
            Joueur joueur =this.presentateurProfile.getJoueur(idJoueur);
            List<Games.ResultGame> listResultatGameParEquipe=presentateurProfile.getResultatGames(joueur.getEquipe());


            //info joueur
            final TextView tvNom =  view.findViewById(R.id.nom_id);
            final TextView tvEquipe =  view.findViewById(R.id.equipe_id);
            final TextView tvLigue =  view.findViewById(R.id.ligue_id);
            final TextView partJoue =  view.findViewById(R.id.partieJoue_id);
            final TextView but =  view.findViewById(R.id.buts_id);
            final TextView passe =  view.findViewById(R.id.passes_id);

            tvNom.setText(presentateurProfile.getJoueurParPosition(position).getNom());
            tvEquipe.setText(presentateurProfile.getEquipe(position).getIdEquipe());
            tvLigue.setText(presentateurProfile.getEquipe(position).getIdLigue());
            partJoue.setText(presentateurProfile.getStatJoueur().toString());
            but.setText(presentateurProfile.getStatJoueur().toString());
            passe.setText(presentateurProfile.getStatJoueur().toString());

            //history matchs à modifier apres la creation de la table resultat des matchs
            final TextView dateRow1 =  view.findViewById(R.id.date_row1);
            final TextView vDRow1 = view.findViewById(R.id.ratio_row1);
            final TextView butRow1 = view.findViewById(R.id.but_row1);
            final TextView passeRow1 =  view.findViewById(R.id.passe_row1);
            final TextView cJRow1 =  view.findViewById(R.id.cj_row1);
            final TextView cRRow1 =  view.findViewById(R.id.cr_row1);

            dateRow1.setText((pastGames.get(0).getDate()));
            //vdrow a ajouter
            butRow1.setText(listResultatGameParEquipe.get(0).getButs());
            passeRow1.setText(listResultatGameParEquipe.get(0).getPasses());
            cJRow1.setText(listResultatGameParEquipe.get(0).getCarteJaune());
            cRRow1.setText(listResultatGameParEquipe.get(0).getCarteRouge());

            final TextView dateRow2 =  view.findViewById(R.id.date_row2);
            final TextView vDRow2 =  view.findViewById(R.id.ratio_row2);
            final TextView butRow2 =  view.findViewById(R.id.but_row2);
            final TextView passeRow2 =  view.findViewById(R.id.passe_row2);
            final TextView cJRow2 =  view.findViewById(R.id.cj_row2);
            final TextView cRRow2 =  view.findViewById(R.id.cr_row2);

            dateRow2.setText((pastGames.get(1).getDate()));
            //vdrow a ajouter
            butRow2.setText(listResultatGameParEquipe.get(1).getButs());
            passeRow2.setText(listResultatGameParEquipe.get(1).getPasses());
            cJRow2.setText(listResultatGameParEquipe.get(1).getCarteJaune());
            cRRow2.setText(listResultatGameParEquipe.get(1).getCarteRouge());




            final TextView dateRow3 =  view.findViewById(R.id.date_row3);
            final TextView vDRow3 =  view.findViewById(R.id.ratio_row3);
            final TextView butRow3 =  view.findViewById(R.id.but_row3);
            final TextView passeRow3 =  view.findViewById(R.id.passe_row3);
            final TextView cJRow3 =  view.findViewById(R.id.cj_row3);
            final TextView cRRow3 =  view.findViewById(R.id.cr_row3);

            dateRow3.setText((pastGames.get(2).getDate()));
            //vdrow a ajouter
            butRow3.setText(listResultatGameParEquipe.get(2).getButs());
            passeRow3.setText(listResultatGameParEquipe.get(2).getPasses());
            cJRow3.setText(listResultatGameParEquipe.get(2).getCarteJaune());
            cRRow3.setText(listResultatGameParEquipe.get(2).getCarteRouge());



            final TextView dateRow4 =  view.findViewById(R.id.date_row4);
            final TextView vDRow4 =  view.findViewById(R.id.ratio_row4);
            final TextView butRow4 =  view.findViewById(R.id.but_row4);
            final TextView passeRow4 =  view.findViewById(R.id.passe_row4);
            final TextView cJRow4 =  view.findViewById(R.id.cj_row4);
            final TextView cRRow4 =  view.findViewById(R.id.cr_row4);

            dateRow4.setText((pastGames.get(3).getDate()));
            //vdrow a ajouter
            butRow4.setText(listResultatGameParEquipe.get(3).getButs());
            passeRow4.setText(listResultatGameParEquipe.get(3).getPasses());
            cJRow4.setText(listResultatGameParEquipe.get(3).getCarteJaune());
            cRRow4.setText(listResultatGameParEquipe.get(3).getCarteRouge());



            final TextView dateRow5 =  view.findViewById(R.id.date_row5);
            final TextView vDRow5 =  view.findViewById(R.id.ratio_row5);
            final TextView butRow5 =  view.findViewById(R.id.but_row5);
            final TextView passeRow5 =  view.findViewById(R.id.passe_row5);
            final TextView cJRow5 =  view.findViewById(R.id.cj_row5);
            final TextView cRRow5 =  view.findViewById(R.id.cr_row5);

            dateRow5.setText((pastGames.get(4).getDate()));
            //vdrow a ajouter
            butRow5.setText(listResultatGameParEquipe.get(4).getButs());
            passeRow5.setText(listResultatGameParEquipe.get(4).getPasses());
            cJRow5.setText(listResultatGameParEquipe.get(4).getCarteJaune());
            cRRow5.setText(listResultatGameParEquipe.get(4).getCarteRouge());


            futurMatchsListView = futurMatchsListView.findViewById(R.id.futur_matchs);

            // Array or ArrayList of items
            ArrayList<String> items = new ArrayList<>();
            for(Games game : futurGames){
                items.add("Date: "+game.getDate()+"   Lieu:"+game.getLieu());
            }

            // Adapter to bind the data to the ListView
            ArrayAdapter<String> adapter = new ArrayAdapter<>(this.getContext(), android.R.layout.simple_list_item_1, items);

            // Set the adapter to the ListView
            futurMatchsListView.setAdapter(adapter);







        }
        return view;
    }


}
*/
