<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

        
class LigueController extends Controller
{

    public function getAllLigues(){
        $reponse=DB::table('ligue')->get();

        return response()->json($reponse,200);
    }
    //fonction qui renvoie les informations sur une ligue
    public function getLigue(int $id){
        $infoLigue=[
            'nomLigue'=>null,
            'categorieLigue'=>null,
            'anneeLigue'=>null,
            'nbEquipes'=>0,
        ];

        //receuillir les informations de la ligue avec la requete vers la table Ligue de la base de donnees
        /* SELECT * FROM ligue
        - WHERE id_ligue = $id
        */
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

    public function ajouterLigue(Request $requete){
        $regles=[
            'nom'=>'required|string|max:15',
            'categorie'=>'required|string|max:10',
            'annee'=>'int|max:9999',
            'id_gestionnaire'=>'required|int|max:9999999999',
            'nb_equipe'=>'required|int|max:99',
        ];

        $validation=Validator::make($requete->all(),$regles);

        if($validation->fails()){
            return response()->json(['error'=>$validation->errors()],422);
        }

        $nom=strip_tags($requete->input('nom'));
        $categorie=strip_tags($requete->input('categorie'));
        $annee=strip_tags($requete->input('annee'));
        $id_gestionnaire=strip_tags($requete->input('id_gestionnaire'));
        $nb_equipe=strip_tags($requete->input('nb_equipe'));

        try{
            DB::beginTransaction();

            DB::table('ligue')->insert([
                'nom'=>$nom,
                'categorie'=>$categorie,
                'annee'=>$annee,
                'id_gestionnaire'=>$id_gestionnaire,
                'nb_equipe'=>$nb_equipe,
            ]);

            DB::commit();
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['error'=>'Ajout impossible','exception'=>$e->getMessage()],500);
        }
        return response()->json(['succes'=>'Insertion de la ligue reussi'],200);
    }

    public function deleteLigue(int $id){
    
        try{
             DB::beginTransaction();
    
            $delete=DB::table('ligue')
                    ->where('id_ligue',$id)
                    ->delete(); 
                
            if($delete>0){
                DB::commit();
                return response()->json(['succes'=>'Ligue supprime avec succes.'],200);
            } else{
                DB::rollBack();
                return response()->json(['error'=>'Aucune ligue trouvee.'],404);
            }  
                        
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['erreur'=>'Erreur dans la deletion','exception'=>$e->getMessage()],500);
        }
    }

    public function modifierLigue (Request $requete){
        try{
            DB::beginTransaction();

            $modification=DB::table('ligue')
                          ->where('id_ligue',$requete->id_ligue)
                          ->update(['nom'=>$requete->nom,
                                    'categorie'=>$requete->categorie,
                                    'annee'=>$requete->annee,
                                    'nb_equipe'=>$requete->nb_equipe]);          
            
            if($modification>0){
                DB::commit();
                return response()->json(['message'=>'Ligue modifie avec succes'],200);
            }else{
                DB::rollBack();
                return response()->json(['message'=>'Modification a echouee'],404);
            }                        
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['error'=>'Erreur dans la modification de la ligue '.$e->getMessage()],400);
        }
    }
}
