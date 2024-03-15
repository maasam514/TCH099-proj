<?php

use App\Http\Controllers\Api\StatistiqueJoueurController;
use App\Http\Controllers\Api\StatistiqueEquipeController;
use App\Http\Controllers\Api\LigueController;
use App\Http\Controllers\Api\EquipeController;
use App\Http\Controllers\Api\JoueurController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\StatistiqueLigueController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Toutes les routes commence avec ***/api/***

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*Route qui retourne les statisitiques d'un joueur en particulier.
-Prend en parametres l'id du joueur dans l'url.
*/
Route::get('statistique/joueur/{id}',[StatistiqueJoueurController::class, 'getStatistiqueIndividuelle']);

/*Route qui retourne les statistiques d'une equipe en particulier.
-Prend en parametre l'id de l'equipe dans l'url
*/
Route::get('statistique/equipe/{id}',[StatistiqueEquipeController::class, 'getStatistiqueEquipe']);

/*Route qui retroune les informations sur une ligue en particulier
-Prend en parametre l'id de la ligue dans l'url.
*/
Route::get('ligue/{id}',[LigueController::class,'getLigue']);

/*Route qui retourne les statistiques et les informations de toutes les equipes qui font parties d'une ligue en particulier
-Prend en parametre l'id de la ligue dans l'url
*/
Route::get('ligue/{id}/equipes',[StatistiqueLigueController::class, 'getStatistiquesEquipesLigues']);

/*Route qui retourne les statistiques de tous les joueurs d'une equipe particuliere
-Prend en parametre l'id de l'equipe dans l'url
*/
Route::get('equipe/{id}/joueurs',[StatistiqueEquipeController::class,'getStatistiquesJoueurs']);

/*Route qui retourne les informations sur un match en particulier
-Prend en parametre l'id du match
*/
Route::get('game/{id}',[GameController::class,'getGame']);

/*Route qui retourne tout les matchs d'une equipe en particulier
-Prend en parametre l'id de l'equipe
*/
Route::get('game/equipe/{id}',[GameController::class,'getGameEquipe']);

/*Route qui retourne tout les matchs d'une ligue en particulier
-Prend en parametre l'id de la ligue
*/
Route::get('game/ligue/{id}',[GameController::class,'getGameLigue']);

//Route qui insert un nouveau joueur dans la base de donnee.
Route::post ('ajouter/joueur',[JoueurController::class,'ajouterJoueur']);

//Route qui insert une nouvelle equipe dans la base de donnee.
Route::post ('ajouter/equipe',[EquipeController::class,'ajouteurEquipe']);
