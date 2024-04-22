<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class StatistiqueLigueController extends Controller
{
    //function qui renvoie les statisitques de toutes les equipes qui fait partie d'une ligue en particulier.
    public function getStatistiquesEquipesLigues (int $id){

        //requete vers la base de donnes qui va renvoyer toutes les informations sur toutes les equipes
        //faisant partie de la ligue

        /* SELECT * FROM Equipe
        -  WHERE id_ligue=$id
        -  INNER JOIN statistique_equipe ON Equipe.id_equipe = statistique_equipe.id_equipe
        */
        $equipes=DB::table('equipe')
                ->where('id_ligue',$id)
                ->join('statistique_equipe','equipe.id_equipe','=','statistique_equipe.id_equipe')
                ->get();

        $reponse=[];        
        
        if(!$equipes->isEmpty()){
            //renvoyer la reponse
            foreach($equipes as $equipe){
                $reponse[]=[
                    'idEquipe'=>$equipe->id_equipe,
                    'nom'=>$equipe->nom,
                    'categorie'=>$equipe->categorie,
                    'idLigue'=>$equipe->id_ligue,
                    'nbJoueurs'=>$equipe->nb_joueurs,
                    'nbVictoires'=>$equipe->nb_victoire,
                    'nbDefaites'=>$equipe->nb_defaite,
                    'nbNuls'=>$equipe->nb_nul,
                    'nbPoints'=>$equipe->nb_point,
                ];
            }
            return response()->json($reponse,200);
        }else{
            return response()->json(['error' => 'Ligue non trouvée'], 404);
        }        
    }
}
