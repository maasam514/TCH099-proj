<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isEmpty;

class GameController extends Controller
{

    public function getAllGames(){
        $games=DB::table('game')
                 ->select('game.*','game_equipe.id_equipe_dom','game_equipe.id_equipe_ext')
                 ->join('game_equipe','game.id_game','=','game_equipe.id_game')
                 ->get();
        $reponse =[];
        if(!$games->isEmpty()){
            foreach($games as $game){
                $reponse[]=[
                    'idGame'=>$game->id_game,
                    'dateGame'=>$game->date_game,
                    'lieu'=>$game->lieu,
                    'idLigue'=>$game->id_ligue,
                    'idEquipeDom'=>$game->id_equipe_dom,
                    'idEquipeExt'=>$game->id_equipe_ext,
                ];
            }
            return response()->json($reponse,200);
        } 
        return response()->json(["error"=>"Erreur lors de la requete"],404);      
    }
    
    public function getGame(int $id){
        $informations=[
            'idGame'=>$id,
            'date'=>null,
            'lieu'=>null,
            'equipeDom'=>null,
            'equipeVis'=>null,
            'idLigue'=>0,
        ];

        /*
        -SELECT * FROM game
        -JOIN game_equipe ON game.id_game=game_equipe.id_game
        -WHERE game.id_game=$id
        */

        $requete=DB::table('game')
                ->where('game.id_game',$id)
                ->join('game_equipe','game.id_game','=','game_equipe.id_game')
                ->first();

        /*
        -SELECT equipe.nom FROM equipe
        -WHERE equipe.id_equipe=$requete.id_equipe_dom;
        */        
        $equipeDom=DB::table('equipe')
                   ->select('equipe.nom')
                   ->where('id_equipe',$requete->id_equipe_dom)
                   ->first();

        /*
        -SELECT equipe.nom FROM equipe
        -Where id_equipe = $requete.id_equipe_ext;
        */           
        $equipeVis=DB::table('equipe')
                   ->select('equipe.nom')
                   ->where('id_equipe',$requete->id_equipe_ext)
                   ->first();           

        if($requete){
            $informations['date']=$requete->date_game;
            $informations['lieu']=$requete->lieu;
            $informations['equipeDom']=$equipeDom->nom;
            $informations['equipeVis']=$equipeVis->nom;
            $informations['idLigue']=$requete->id_ligue;

            return response()->json($informations,200);
        }else{
            return response()->json(['error'=>'Match non trouve'],404);
        }        
    }

    public function getGameEquipe(int $id){

      //initialiser la reponse
        $informations=[
            'parties'=>[],
        ];

         /*
        -SELECT game.id_game, game.date_game, game.lieu, equipe.nom as equipeContre
        -FROM game_equipe
        -JOIN game ON game_equipe.id_game = game.id_game
        -JOIN equipe ON (
            (equipe.id_equipe = game_equipe.id_equipe_ext AND game_equipe.id_equipe_dom = $id)
            OR
            (equipe.id_equipe = game_equipe.id_equipe_dom AND game_equipe.id_equipe_ext = $id)
        )
        -WHERE game_equipe.id_equipe_ext = $id OR game_equipe.id_equipe_dom = $id;
        */

        //faire la requete vers la base de donne
        $games = DB::table('game_equipe')
        ->select('game.id_game', 'game.date_game', 'game.lieu', 'equipe.nom as equipeContre')
        //faire une jointure sur la table game
        ->join('game', 'game_equipe.id_game', '=', 'game.id_game')
        //faire une jointure sur la table equipe
        ->join('equipe', function ($join) use ($id) {
            /*si l'equipe avec l'id de l'url est l'equipe a domicile, on join sur
            l'id de l'equipe exterieur. 
            */
            $join->on('equipe.id_equipe', '=', 'game_equipe.id_equipe_ext')
                ->where('game_equipe.id_equipe_dom', '=', $id)
                /* si l'equipe avec l'id dans l'url est l'equipe qui visite,
                on join sur l'id de l'equipe a domicile.
                */
                ->orWhere(function ($requete) use ($id) {
                    $requete->on('equipe.id_equipe', '=', 'game_equipe.id_equipe_dom')
                        ->where('game_equipe.id_equipe_ext', '=', $id);
                });
        })
        //Selectionne les matchs ou l'equipe avec l'id dans l'url est l'equipe a domicile ou l'equipe qui visite.
        ->where(function ($requete) use ($id) {
            $requete->where('game_equipe.id_equipe_ext', '=', $id)
                    ->orWhere('game_equipe.id_equipe_dom', '=', $id);
        })
        ->get();

        if ($games->isNotEmpty()) {
            foreach($games as $game){
                $informations['parties'][]=[
                    'idGame'=>$game->id_game,
                    'dateGame'=>$game->date_game,
                    'lieu'=>$game->lieu,
                    'equipeContre'=>$game->equipeContre
                ];
            }
            
            return response()->json($informations, 200);
        } else {
            return response()->json(['error' => 'Aucune partie trouvée pour cette équipe'], 404);
        }
    }

    public function getGameLigue(int $id){

        /*SELECT game.*, game_equipe.id_equipe_dom, game_equipe.id_equipe_ext
        - FROM Game
        - JOIN game_equipe ON game.id_game = game_equipe.id_game
        - WHERE game.id_ligue=$id;
        */
        $games=DB::table('game')
               ->where('id_ligue',$id)
               ->select('game.*','game_equipe.id_equipe_dom','game_equipe.id_equipe_ext')
               ->join('game_equipe','game.id_game','=','game_equipe.id_game')
               ->get();
        
        if($games->isEmpty()){
            return response()->json(['error'=>'Aucun match trouve pour cette ligue'],404);
        }
        $reponse=[];
        foreach($games as $game){
            $reponse[]=[
                'idGame'=>$game->id_game,
                'dateGame'=>$game->date_game,
                'lieu'=>$game->lieu,
                'idLigue'=>$game->id_ligue,
                'idEquipeDom'=>$game->id_equipe_dom,
                'idEquipeExt'=>$game->id_equipe_ext,
            ];
        }  
        return response()->json($reponse,200);     
    }

    public function ajouterGame(Request $requete){
        $regles=[
            'idGame'=>'required|integer',
            'date'=>'required|date',
            'lieu'=>'required|string|max:20',
            'idLigue'=>'required|integer',
            'idEquipeDom'=>'required|integer',
            'idEquipeExt'=>'required|integer'
        ];

        $validation=Validator::make($requete->all(),$regles);

        if($validation->fails()){
            return response()->json(['error'=>$validation->errors()],422);
        }

        $idGame=filter_var($requete->input('idGame'),FILTRE_SANITIZE_NUMBER_INT);
        $date=strip_tags($requete->input('date'));
        $lieu=strip_tags($requete->input('lieu'));
        $idLigue=filter_var($requete->input('idLigue'),FILTRE_SANITIZE_NUMBER_INT);
        $idEquipeDom=filter_var($requete->input('idEquipeDom'),FILTRE_SANITIZE_NUMBER_INT);
        $idEquipeExt=filter_var($requete->input('idEquipeExt'),FILTRE_SANITIZE_NUMBER_INT);

        try{
            DB::beginTransaction();

             DB::table('game')->insert([
                'id_game'=>$idGame,
                'date_game'=>$date,
                'lieu'=>$lieu,
                'id_ligue'=>$idLigue
            ]);

            DB::table('game_equipe')->insert([
                'id_equipe_dom'=>$idEquipeDom,
                'id_equipe_ext'=>$idEquipeExt,
                'id_game'=>$idGame
            ]);

            DB::commit();
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['error'=>'Ajout impossible','exception'=>$e->getMessage()],500);
        }
        return response()->json(['succes'=>'Insertion du match reussi'],200);
        
    }

    public function deleteGame(int $id){
    
        try{
             DB::beginTransaction();
    
            $delete=DB::table('game')
                    ->where('id_game',$id)
                    ->delete(); 
                
            if($delete>0){
                DB::commit();
                return response()->json(['succes'=>'Partie supprime avec succes.'],200);
            } else{
                DB::rollBack();
                return response()->json(['error'=>'Aucune Partie trouvee.'],404);
            }  
                        
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['erreur'=>'Erreur dans la deletion','exception'=>$e->getMessage()],500);
        }
        
    }

    public function getResultatGame(int $id){
        $resultat=DB::table('resultat_match')
                 ->where('id_game',$id)
                 ->first();

        if(!is_null($resultat)){
            $reponse=[
                'idGame'=>$resultat->id_game,
                'scoreEquipeDom'=>$resultat->score_equipe_dom,
                'scoreEquipeExterieur'=>$resultat->score_equipe_exterieur,
                'passes'=>$resultat->passes,
                'carteJaune'=>$resultat->carte_jaune,
                'carteRouge'=>$resultat->carte_rouge,
            ];
            return response()->json($reponse,200);
        }
        return response()->json(["error"=>"Erreur lors de la requete"],404);     
    }

    public function getResultatsGamesPourEquipe(int $id){
        $resultats = DB::table('resultat_match')
                    ->whereIn('id_game', function($query) use ($id) {
                        $query->select('id_game')
                              ->from('game_equipe')
                              ->where('id_equipe_dom', $id)
                              ->orWhere('id_equipe_ext', $id);
                    })
                    ->get();
        $reponse=[];

        if(!$resultats->isEmpty()){
            foreach($resultats as $resultat){
                $reponse[]=[
                    'idGame'=>$resultat->id_game,
                    'scoreEquipeDom'=>$resultat->score_equipe_dom,
                    'scoreEquipeExterieur'=>$resultat->score_equipe_exterieur,
                    'passes'=>$resultat->passes,
                    'carteJaune'=>$resultat->carte_jaune,
                    'carteRouge'=>$resultat->carte_rouge,
                ];
            }
            return response()->json($reponse,200);
        }else {
            return response()->json(["error"=>"Erreur lors de la requete"],404);
        }
    }
    

    public function ajouterResultatsMatch(Request $request){
        $regles =[
            'idGame'=>'required|integer',
            'scoreEquipeDom'=>'required|integer',
            'scoreEquipeExterieur'=>'required|integer',
            'passes'=>'required|integer',
            'carteJaune'=>'required|integer',
            'carteRouge'=>'required|integer',
        ];

        $validation=Validator::make($requete->all(),$regles);

        if($validation->fails()){
            return response()->json(['error'=>$validation->errors()],422);
        }

        $idGame = filter_var($request->input('idGame'), FILTER_SANITIZE_NUMBER_INT);
        $scoreEquipeDom = filter_var($request->input('scoreEquipeDom'), FILTER_SANITIZE_NUMBER_INT);
        $scoreEquipeExterieur = filter_var($request->input('scoreEquipeExterieur'), FILTER_SANITIZE_NUMBER_INT);
        $passes = filter_var($request->input('passes'), FILTER_SANITIZE_NUMBER_INT);
        $carteJaune = filter_var($request->input('carteJaune'), FILTER_SANITIZE_NUMBER_INT);
        $carteRouge = filter_var($request->input('carteRouge'), FILTER_SANITIZE_NUMBER_INT);

        try{
            DB::beginTransaction();

            DB::table('resultat_match')->insert([
                'id_game'=>$idGame,
                'score_equipe_dom'=>$scoreEquipeDom,
                'score_equipe_exterieur'=>$scoreEquipeExterieur,
                'passes'=>$passes,
                'carte_jaune'=>$carteJaune,
                'carte_rouge'=>$carteRouge,
            ]);

            DB::commit();
            return response()->json(['succes'=>'Ajout des resultats reussis',200]);
        }catch(QueryException $e){
            DB::rollBack();
            return response()->json(['error'=>'Ajout impossible','exception'=>$e->getMessage()],500);
        }
        

    }


}
