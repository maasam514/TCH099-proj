<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class LigueController extends Controller
{
    //fonction qui renvoie les informations sur une ligue
    public function getLigue(int $id){
        $infoLigue=[
            'nomLigue'=>null,
            'categorieLigue'=>null,
            'anneeLigue'=>null,
            'nbEquipes'=>0,
        ];

        //receuillir les informations de la ligue avec la requete vers la table Ligue de la base de donnees
        $ligue=DB::table('ligue')
               ->where('id_ligue',$id)
               ->first();

        //remplir le tableau associatif       
        if(!is_null($ligue)){
            $infoLigue['nomLigue']=$ligue->nom;
            $infoLigue['categorieLigue']=$ligue->categorie;
            $infoLigue['anneeLigue']=$ligue->annee;
            $infoLigue['nbEquipes']=$ligue->nb_equipe;
        }else{
            return response()->json(['error' => 'Ligue non trouvée'], 404);
        }   
        
        //renvoyer les informations
        return response()->json($infoLigue,200);
    }
}
