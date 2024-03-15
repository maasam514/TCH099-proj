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
        $equipes=DB::table('Equipe')
                ->where('id_ligue',$id)
                ->join('statistique_equipe','Equipe.id_equipe','=','statistique_equipe.id_equipe')
                ->get();
        
        if(!$equipes->isEmpty()){
            //renvoyer la reponse
            return response()->json($equipes,200);
        }else{
            return response()->json(['error' => 'Ligue non trouvée'], 404);
        }        
    }
}
