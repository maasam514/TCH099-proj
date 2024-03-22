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
            return response()->json($gestionnaire,200);
        }
        return response([
            'error'=>'Aucun gestionnaire trouvee',
        ],404);              
    }
}
