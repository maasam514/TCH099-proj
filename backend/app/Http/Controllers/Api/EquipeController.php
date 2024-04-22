<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

use function PHPUnit\Framework\isNull;

class EquipeController extends Controller
{
    public function getEquipe(int $id){
        $infoEquipe=DB::table('equipe')
                    ->where('id_equipe',$id)
                    ->first();
        
        if(!is_null($infoEquipe)){
            $reponse = [
                'idEquipe'=>$infoEquipe->id_equipe,
                'nom'=>$infoEquipe->nom,
                'categorie'=>$infoEquipe->categorie,
                'idLigue'=>$infoEquipe->id_ligue,
                'nbJoueurs'=>$infoEquipe->nb_joueurs,
            ];
            return response()->json($reponse, 200);
        }
        
        return response()->json(['error'=>'Aucune equipe trouvee'],404);            
    }

    public function getAllEquipes(){
        $equipes=DB::table('equipe')
                ->get();
        
        $reponse = [];
        if(!$equipes->isEmpty()){
            foreach($equipes as $equipe){
                $reponse[] = [
                    'idEquipe'=>$equipe->id_equipe,
                    'nom'=>$equipe->nom,
                    'categorie'=>$equipe->categorie,
                    'idLigue'=>$equipe->id_ligue,
                    'nbJoueurs'=>$equipe->nb_joueurs,
                ];
            }
            return response()->json($reponse,200);
        }
        return response()->json(['message'=>'erreur lors de la demande'],404);        
    }

    public function getEquipesAvecMoinsDeJoueurs(Request $requete){
        $nbJoueurs=$requete->query('nb_joueurs');
        $equipes=DB::table('equipe')
                ->where('nb_joueurs','<=',$nbJoueurs)
                ->get();
         
        $reponse = [];        
        if(!$equipes->isEmpty()){
            foreach($equipes as $equipe){
                $reponse[] = [
                    'idEquipe'=>$equipe->id_equipe,
                    'nom'=>$equipe->nom,
                    'categorie'=>$equipe->categorie,
                    'idLigue'=>$equipe->id_ligue,
                    'nbJoueurs'=>$equipe->nb_joueurs,
                ];
            }
            return response()->json($reponse,200);  
        }        
        return response()->json(['message'=>'Aucune equipe avec moins de '.$nbJoueurs.' joueurs'],404);        
    }

    public function ajouterEquipe(Request $requete){
        $regles=[
            'nom'=>'required|string|max:20',
            'categorie'=>'required|string|max:10',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'idLigue'=>'required|int|max:9999999999'
        ];

        $validation=Validator::make($requete->all(),$regles);

        if($validation->fails()){
            return response()->json(['error'=>$validation->errors()],422);
        }

        $nom=strip_tags($requete->input('nom'));
        $categorie=strip_tags($requete->input('categorie'));
        $idLigue=filter_var($requete->input('idLigue'),FILTRE_SANITIZE_NUMBER_INT);

        //Verifier si un fichier image a ete envoye, si il y en a une
        //creer un nom de fichier avec l'extension de l'image envoye
        //et l'ajouter dans le dossier ./public/images.
        if($requete->hasFile('image')){
            $image=$requete->file('image');
            $nomImage=time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'),$nomImage);
        }

        try{
            DB::beginTransaction();

            DB::table('equipe')->insert([
                'nom'=>$nom,
                'categorie'=>$categorie,
                'id_ligue'=>$idLigue,
                //mettre le nom du fichier image dans la base de donnee
                'image'=>$nomImage,
            ]);

            DB::commit();
        }catch(QueryException $e){
            DB::rollBack();

            //si l'erreur s'est fait apres l'ajout de l'image dans le dossier ./public/images
            //enlevr l'image du dossier.
            if(isset($nomImage)){
                unlink(public_path('images/'. $nomImage));
            }
            return response()->json(['error'=>'Ajout impossible','exception'=>$e->getMessage()],500);
        }
        return response()->json(['succes'=>'Insertion de lequipe reussi'],200);
    }

    public function deleteEquipe(int $id){
    
        try{
             DB::beginTransaction();
    
            $delete=DB::table('equipe')
                    ->where('id_equipe',$id)
                    ->delete(); 
                
            if($delete>0){
                DB::commit();
                return response()->json(['succes'=>'Equipe supprime avec succes.'],200);
            } else{
                DB::rollBack();
                return response()->json(['error'=>'Aucune Equipe trouvee.'],404);
            }  
                        
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['erreur'=>'Erreur dans la deletion','exception'=>$e->getMessage()],500);
        }
        
    }

    public function modifierEquipe(Request $requete){
        try{
            DB::beginTransaction();

            $modification=DB::table('equipe')
                          ->where('id_equipe',$requete->idEquipe)
                          ->update(['nom'=>$requete->nom,
                                    'categorie'=>$requete->categorie,
                                    'id_ligue'=>$requete->idLigue,
                                    'nb_joueurs'=>$requete->nbJoueurs,]);          
            
            if($modification>0){
                DB::commit();
                return response()->json(['message'=>'Equipe modifiee avec succes'],200);
            }else{
                DB::rollBack();
                return response()->json(['message'=>'Modification echouee'],404);
            }                        
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['error'=>'Erreur dans la modification de l\'equipe '.$e->getMessage()],400);
        }
    }
}
