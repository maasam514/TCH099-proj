<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatistiqueEquipeController extends Controller
{
    //fonction pour renvoyer les statistiques d'une equipe
    public function getStatistiqueEquipe(int $id){

        //intialisation de tableau associatif
       $statistiques=[
        'nbVictoires'=>0,
        'nbDefaites'=>0,
        'nbNuls'=>0,
        'nbPoints'=>0,
        'nbButsPour'=>0,
        'nbButsContre'=>0,
        'nbMatchs'=>0,
       ];
       
       //faire la requete a la base de donnee pour l'equipe voulue
       $requete=DB::table('Statistique_Equipe')
                ->where('id_equipe',$id)
                ->first();

        //remplir le tableau associatif        
        if ($requete !==null ) {
            $statistiques['nbVictoires'] = $requete->nb_victoire;
            $statistiques['nbDefaites'] = $requete->nb_defaite;
            $statistiques['nbNuls'] = $requete->nb_nul;
            $statistiques['nbPoints'] = $requete->nb_point;
            $statistiques['nbButsPour'] = $requete->but_pour;
            $statistiques['nbButsContre'] = $requete->but_contre;
            $statistiques['nbMatchs'] = $requete->nb_game;
        }else{
            return response()->json(['error' => 'Equipe non trouvée'], 404);
        }
        
        //renvoyer les donnes obtenus
        return response()->json($statistiques,200);
    }

    public function getStatistiquesJoueurs(int $id){

        $joueurs=DB::table('Joueur')
                 ->where('id_equipe',$id)
                 ->get();

        $statistiquesJoueurs=[];
        $compteur=0;
        if(!$joueurs->isEmpty()){
            foreach($joueurs as $joueur){
                $statistiques = DB::table('Feuille_Statistique_Joueur')
                ->where('id_joueur', $joueur->id_joueur)
                ->get();

                //Verifier si le joueur avec l'id specifie existe et qu'il a des statistiques
                if($statistiques->isEmpty()){
                    return response()->json(['error'=>'Joueur non trouvee'], 404);
                }

            //intialiser le tableau de la reponse
                $statistiquesComplete=[
                    'idJoueur'=>$joueur->id_joueur,
                    'prenom'=>$joueur->prenom,
                    'nom'=>$joueur->nom,
                    'capitaine'=>$joueur->capitaine,
                    'nbButs'=>0,
                    'nbPasses'=>0,
                    'nbCartonJaune'=>0,
                    'nbCartonRouge'=>0,
                ];

            //remplir le tableau qui sera renvoyee
                foreach($statistiques as $statistique){
                    $statistiquesComplete['idJouer']=
                    $statistiquesComplete['nbButs']+=$statistique->nb_but;
                    $statistiquesComplete['nbPasses']+=$statistique->nb_passe;
                    $statistiquesComplete['nbCartonJaune']+=$statistique->nb_carton_jaune;
                    $statistiquesComplete['nbCartonRouge']+=$statistique->nb_carton_rouge;
                    $statistiquesJoueurs[$compteur]=$statistiquesComplete;
                    $compteur++;
                }
            }
        }else{
            return response()->json(['error'=>'Equipe non trouvee'],404);
        }

        if(!empty($statistiquesJoueurs)){
            return response()->json($statistiquesJoueurs,200);
        }else{
            return response()->json(['error'=>'Aucun joueurs trouves dans cette equipe'],404);
        }
    }

}
