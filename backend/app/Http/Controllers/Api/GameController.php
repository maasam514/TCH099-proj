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
               
        if(!$games->isEmpty()){
            return response()->json($games,200);
        } 
        return response()->json(["error"=>"Erreur lors de la requete"],404);      
    }
    public function getGame(int $id){
        $informations=[
            'id_game'=>$id,
            'date'=>null,
            'lieu'=>null,
            'equipeDom'=>null,
            'equipeVis'=>null,
            'id_ligue'=>0,
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
            $informations['id_ligue']=$requete->id_ligue;

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

        /*SELECT game.id_ligue FROM Game
        - WHERE game.id_ligue=$id;
        */
        $games=DB::table('Game')
               ->where('id_ligue',$id)
               ->get();
        
        if($games->isEmpty()){
            return response()->json(['error'=>'Aucun match trouve pour cette ligue'],404);
        }  
        return response()->json($games,200);     
    }

    public function ajouterGame(Request $requete){
        $regles=[
            'id_game'=>'required|integer',
            'date'=>'required|date',
            'lieu'=>'required|string|max:20',
            'id_ligue'=>'required|integer',
            'id_equipe_dom'=>'required|integer',
            'id_equipe_ext'=>'required|integer'
        ];

        $validation=Validator::make($requete->all(),$regles);

        if($validation->fails()){
            return response()->json(['error'=>$validation->errors()],422);
        }

        $id_game=strip_tags($requete->input('id_game'));
        $date=strip_tags($requete->input('date'));
        $lieu=strip_tags($requete->input('lieu'));
        $id_ligue=strip_tags($requete->input('id_ligue'));
        $id_equipe_dom=strip_tags($requete->input('id_equipe_dom'));
        $id_equipe_ext=strip_tags($requete->input('id_equipe_ext'));

        try{
            DB::beginTransaction();

             DB::table('game')->insert([
                'id_game'=>$id_game,
                'date_game'=>$date,
                'lieu'=>$lieu,
                'id_ligue'=>$id_ligue
            ]);

            DB::table('game_equipe')->insert([
                'id_equipe_dom'=>$id_equipe_dom,
                'id_equipe_ext'=>$id_equipe_ext,
                'id_game'=>$id_game
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

    }

    public function getResultatsGamesPourEquipe(int $id){

    }


}
