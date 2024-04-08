<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatistiqueJoueurController extends Controller
{
    //fonction qui renvoie les statistiques d'un jouer.
    public function getStatistiqueIndividuelle(int $id)
    {
        //Faire la connection a la base de donnee pour obtenir le joueur que l'on veut.

        /* SELECT * FROM Feuille_Statistique_Joueur
        -  WHERE id_joueur=$id
        */
        $statistiques = DB::table('feuille_statistique_joueur')
        ->where('id_joueur', $id)
        ->get();

        //Verifier si le joueur avec l'id specifie existe et qu'il a des statistiques
        if($statistiques->isEmpty()){
            return response()->json(['error'=>'Joueur non trouvee'], 404);
        }

        //intialiser le tableau de la reponse
        $statistiquesComplete=[
            'nbButs'=>0,
            'nbPasses'=>0,
            'nbCartonJaune'=>0,
            'nbCartonRouge'=>0,
            'nbMatch'=>0,
        ];

        $nombreMatch=0;
        //remplir le tableau qui sera renvoyee
        foreach($statistiques as $statistique){
            $statistiquesComplete['nbButs']+=$statistique->nb_but;
            $statistiquesComplete['nbPasses']+=$statistique->nb_passe;
            $statistiquesComplete['nbCartonJaune']+=$statistique->nb_carton_jaune;
            $statistiquesComplete['nbCartonRouge']+=$statistique->nb_carton_rouge;
            $nombreMatch++;
        }
        $statistiquesComplete['nbMatch'] = $nombreMatch;
        //renvoyer les statistiques.
        return response()->json($statistiquesComplete,200);
     
    }
}
