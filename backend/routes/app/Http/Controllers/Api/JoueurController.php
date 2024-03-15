<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class JoueurController extends Controller
{
    public function ajouterJoueur(Request $requete){

        //regles de validation
        $regles=[
            'prenom'=>'required|string|max:20',
            'nom'=>'required|string|max:20',
            'numTel'=>'required|regex:/\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/',
            'courriel'=>'required|string|max:40',
            'capitaine'=>'required|int|between:0,1',
            'numero'=>'int|max:99',
            'dateNaissance'=>'required|date|before_or_equal:today|after_or_equal:1900-01-01',
            'idEquipe'=>'int|max:9999'
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
        $numTel=strip_tags($requete->input('numTel'));
        $courriel=strip_tags($requete->input('courriel'));
        $dateNaissance=strip_tags($requete->input('dateNaissance'));
        $capitaine=$requete->input('capitaine');
        $numero=$requete->input('numero');
        $idEquipe=$requete->input('idEquipe');

        //faire l'insertion dans la base de donnee
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

        return response()->json(['message'=>'Insertion reussi'],200);

    }
}
