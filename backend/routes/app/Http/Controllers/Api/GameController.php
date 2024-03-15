<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isEmpty;

class GameController extends Controller
{
    public function getGame(int $id){
        $informations=[
            'date'=>null,
            'lieu'=>null,
            'equipeDom'=>null,
            'equipeVis'=>null,
        ];

        $requete=DB::table('game')
                ->where('game.id_game',$id)
                ->join('game_equipe','game.id_game','=','game_equipe.id_game')
                ->first();

        $equipeDom=DB::table('equipe')
                   ->select('equipe.nom')
                   ->where('id_equipe',$requete->id_equipe_dom)
                   ->first();

        $equipeVis=DB::table('equipe')
                   ->select('equipe.nom')
                   ->where('id_equipe',$requete->id_equipe_ext)
                   ->first();           

        if($requete){
            $informations['date']=$requete->date_game;
            $informations['lieu']=$requete->lieu;
            $informations['equipeDom']=$equipeDom->nom;
            $informations['equipeVis']=$equipeVis->nom;

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
        $games=DB::table('Game')
               ->where('id_ligue',$id)
               ->get();
        
        if($games->isEmpty()){
            return response()->json(['error'=>'Aucun match trouve pour cette ligue'],404);
        }  
        return response()->json($games,200);     
    }


}
