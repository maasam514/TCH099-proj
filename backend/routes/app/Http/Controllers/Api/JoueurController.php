<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class JoueurController extends Controller
{
    public function getJoueur(int $id){
        $infoJoueur=DB::table('joueur')
        ->where('id_joueur',$id)
        ->first();

        if(!is_null($infoJoueur)){
            return response()->json($infoJoueur, 200);
        }
        return response()->json(['error'=>'Aucun joueur trouvee'],404);
    }

    public function ajouterJoueur(Request $requete){

        //regles de validation
        $regles=[
            'prenom'=>'required|string|max:20',
            'nom'=>'required|string|max:20',
            'num_Tel'=>'required|regex:/\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/',
            'courriel'=>'required|string|max:40',
            'capitaine'=>'required|integer|between:0,1',
            'numero'=>'nullable|integer|max:99',
            'date_de_naissance'=>'required|date|before_or_equal:today|after_or_equal:1900-01-01',
            'id_equipe'=>'nullable|integer|max:9999999999'
        ];

        //Faire la validation cote serveur
        $validation=Validator::make($requete->all(),$regles);

        //si la validation echoue, envoyer une reponse d'erreur avec un code 422 signalant que le
        //serveur ne peut traiter la requete.
        if($validation->fails()){
            return response()->json(['error'=>$validation->errors()],422);
        }

        //faire un sanitize des champs de la requete.
        $prenom=strip_tags($requete->input('prenom'));
        $nom=strip_tags($requete->input('nom'));
        $numTel=strip_tags($requete->input('num_tel'));
        $courriel=strip_tags($requete->input('courriel'));
        $dateNaissance=strip_tags($requete->input('date_de_naissance'));
        $capitaine=$requete->input('capitaine');
        $numero=$requete->input('numero');
        $idEquipe=$requete->input('id_equipe');

        //faire l'insertion dans la base de donnee

        try{
            DB::beginTransaction();

            DB::table('Joueur')->insert([
                'prenom'=>$prenom,
                'nom'=>$nom,
                'date_de_naissance'=>$dateNaissance,
                'num_tel'=>$numTel,
                'courriel'=>$courriel,
                'capitaine'=>$capitaine,
                'numero'=>$numero,
                'id_equipe'=>$idEquipe,
            ]);

            DB::commit();
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['error'=>'Ajout impossible','exception'=>$e->getMessage()],500);
        }
        return response()->json(['succes'=>'Insertion du joueur reussi'],200);
    }

    public function deleteJoueur(int $id){
      
        try{
            DB::beginTransaction();

            $delete=DB::table('joueur')
                    ->where('id_joueur',$id)
                    ->delete(); 
            
            if($delete>0){
                DB::commit();
                return response()->json(['succes'=>'Joueur supprime avec succes.'],200);
            } else{
                DB::rollBack();
                return response()->json(['error'=>'Aucun joueur trouvee.'],404);
            }  
                    
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['erreur'=>'Erreur dans la deletion du joueur','exception'=>$e->getMessage()],500);
        }
    
    }


    
}
