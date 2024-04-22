<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class GestionnaireController extends Controller
{
    public function getGestionnaireLigue(int $id){
        $gestionnaire=DB::table('gestionnaire_de_ligue')
                      ->where('id_gestionnaire',$id)
                      ->first();
        
        if(!is_null($gestionnaire)){
            $reponse=[
                'idGestionnaire'=>$gestionnaire->id_gestionnaire,
                'nom'=>$gestionnaire->nom,
                'prenom'=>$gestionnaire->prenom,
                'numTel'=>$gestionnaire->num_tel,
                'courriel'=>$gestionnaire->courriel,
                'idLigue'=>$gestionnaire->id_ligue,
            ];
            return response()->json($reponse,200);
        }
        return response()->json([
            'error' => 'Aucun gestionnaire trouvé'
        ], 404);             
    }
}
