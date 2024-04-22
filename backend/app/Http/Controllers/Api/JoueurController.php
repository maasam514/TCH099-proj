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
            $reponse = [
                'idJoueur'=>$infoJoueur->id_joueur,
                'prenom'=>$infoJoueur->prenom,
                'nom'=>$infoJoueur->nom,
                'capitaine'=>$infoJoueur->capitaine,
                'numero'=>$infoJoueur->numero,
                'idEquipe'=>$infoJoueur->id_equipe,
                'dateDeNaissance'=>$infoJoueur->date_de_naissance,
                'courriel'=>$infoJoueur->courriel,
            ];
            return response()->json($reponse, 200);
        }
        return response()->json(['error'=>'Aucun joueur trouvee'],404);
    }

    public function getAllJoueurs(){
        $infoJoueurs=DB::table('joueur')
                    ->join('equipe', 'joueur.id_equipe', '=', 'equipe.id_equipe')
                    ->select('joueur.*','joueur.nom as joueur_nom', 'equipe.nom as equipe_nom')
                    ->get();
        $reponse=[];
        if(!$infoJoueurs->isEmpty()){
            foreach($infoJoueurs as $joueur){
                $reponse[]=[
                    'idJoueur'=>$joueur->id_joueur,
                    'prenom'=>$joueur->prenom,
                    'nom'=>$joueur->nom,
                    'capitaine'=>$joueur->capitaine,
                    'numero'=>$joueur->numero,
                    'idEquipe'=>$joueur->id_equipe,
                    'dateDeNaissance'=>$joueur->date_de_naissance,
                ];
            }
            return response()->json($infoJoueurs,200);
        } 
        return response()->json(['error'=>'Erreur dans la recuperation des joueurs']);           
    }

    public function ajouterJoueur(Request $requete){

        //regles de validation
        $regles=[
            'prenom'=>'required|string|max:20',
            'nom'=>'required|string|max:20',
            'numTel'=>'required|regex:/\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/',
            'courriel'=>'required|string|max:40',
            'capitaine'=>'required|integer|between:0,1',
            'numero'=>'nullable|integer|max:99',
            'dateDeNaissance'=>'required|date|before_or_equal:today|after_or_equal:1900-01-01',
            'idEquipe'=>'nullable|integer|max:9999999999'
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
        $dateNaissance=strip_tags($requete->input('dateDeNaissance'));
        $capitaine=$requete->input('capitaine');
        $numero=filter_var($requete->input('numero'),FILTRE_SANITIZE_NUMBER_INT);
        $idEquipe=filter_var($requete->input('idEquipe'),FILTRE_SANITIZE_NUMBER_INT);

        //faire l'insertion dans la base de donnee

        try{
            DB::beginTransaction();

           $idJoueur= DB::table('joueur')->insertGetId([
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
        $infoJoueur = DB::table('joueur')->where('id_joueur', $idJoueur)->first();
        return response()->json(['succes' => 'Insertion du joueur réussi', 'joueur' => $infoJoueur], 200);
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

    public function modifierJoueur(Request $requete){
        try{
            DB::beginTransaction();

            $modification=DB::table('joueur')
                          ->where('id_joueur',$requete->idJoueur)
                          ->update(['prenom'=>$requete->prenom,'nom'=>$requete->nom,
                                    'num_tel'=>$requete->numTel,'courriel'=>$requete->courriel,
                                    'capitaine'=>$requete->capitaine,'numero'=>$requete->numero,
                                    'id_equipe'=>$requete->idEquipe,'date_de_naissance'=>$requete->dateDeNaissance]);          
            
            if($modification>0){
                DB::commit();
                return response()->json(['message'=>'Joueur modifie avec succes'],200);
            }else{
                DB::rollBack();
                return response()->json(['message'=>'Modification a echouee'],404);
            }                        
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['error'=>'Erreur dans la modification du jouer '.$e->getMessage()],400);
        }
    }


    
}
