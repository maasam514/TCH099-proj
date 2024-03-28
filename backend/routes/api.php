<?php

use App\Http\Controllers\Api\StatistiqueJoueurController;
use App\Http\Controllers\Api\StatistiqueEquipeController;
use App\Http\Controllers\Api\LigueController;
use App\Http\Controllers\Api\EquipeController;
use App\Http\Controllers\Api\JoueurController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\GestionnaireController;
use App\Http\Controllers\Api\StatistiqueLigueController;
use App\Http\Controllers\Api\AuthController;
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

//Route qui sont seulement accessible aux utilisateurs authentifier
Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('logout', [AuthController::class, 'seDeconnecter']);
    Route::post('joueur', [JoueurController::class, 'ajouterJoueur']);
});

//Les routes qui ne peuvent etre accessible au gestionnaire de ligue
Route::middleware(['auth:sanctum','gestionnaire'])->group(function(){

    //Route qui insert une nouvelle ligue dans la base de donnee.
    Route::post('ligue',[LigueController::class,'ajouterLigue']);

    /*Route qui insert un nouveau match dans la base de donnee.
    - La requete doit comptre les id des deux equipes (exterieur et domicile)
    - ainsi qu'un id de match
    */
    Route::post('game',[GameController::class,'ajouterMatch']);

    //Route qui supprime un joueur dans la base de donnee.
    Route::delete('joueur/{id}',[JoueurController::class,'deleteJoueur']);

    //Route qui supprime une equipe dans la base de donnee.
    Route::delete('equipe/{id}',[EquipeController::class,'deleteEquipe']);

    //Route qui supprime une ligue dans la base de donnee.
    Route::delete('ligue/{id}',[LigueController::class,'deleteLigue']);

    //Route qui supprime un match dans la base de donnee.
    Route::delete('game/{id}',[GameController::class,'deleteGame']);

    //Route qui insert une nouvelle equipe dans la base de donnee.
    Route::post ('equipe',[EquipeController::class,'ajouteurEquipe']);

    //Route qui modifie un joueur dans la base de donnee.
    Route::put('joueur',[JoueurController::class,'modifierJoueur']);

    //Route qui modifie une equipe dans la base de donnee.
    Route::put('equipe',[EquipeController::class,'modifierEquipe']);

    //Route qui modifie une ligue dans la base de donnee.
    Route::put('ligue/{id}',[LigueController::class,'modifierLigue']);
});

//Route pour se connecter a son compte utilisateur si on en possede un
Route::post('login',[AuthController::class,'seConnecter']);

//Route pour la creation d'un utilisateur
Route::post('register',[AuthController::class,'creerCompte']);

/*Route qui retourne les statisitiques d'un joueur en particulier.
-Prend en parametres l'id du joueur dans l'url.
*/
Route::get('statistique/joueur/{id}',[StatistiqueJoueurController::class, 'getStatistiqueIndividuelle']);

//Route qui retourne toutes les ligues d'inscrite dans la base de donnee
Route::get('ligues',[LigueController::class, 'getAllLigues']);

/*Route qui retourne les statistiques d'une equipe en particulier.
-Prend en parametre l'id de l'equipe dans l'url
*/
Route::get('statistique/equipe/{id}',[StatistiqueEquipeController::class, 'getStatistiqueEquipe']);

/*Route qui retourne les informations d'un joueur en particulier.
-Prend en parametres l'id du joueur dans l'url.
*/
Route::get('joueur/{id}',[JoueurController::class, 'getJoueur']);

/*Route qui retourne le resultat d'un match specifique
- Prend en parametre l'id du match dans l'url
*/
Route::get('resultat/{id}',[GameController::class,'getResultatGame']);

/*Route qui retourne les resultats des matchs jouees par une equipe specifique
- Prend en parametre l'id de l'equipe dans l'url
*/
Route::get('resultats/equipe/{id}',[GameController::class,'getResultatsGamesPourEquipe']);

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

/*Route qui retourne les informations d'une equipe particuliere
-Prend en parametre l'id de l'equipe dans l'url
*/
Route::get('/api/equipe/{id}',[EquipeController::class,'getEquipe']);

/*Route qui retourne toutes qui ont moins de x joueurs
- La route se presente comme telle: ../api/equipes?nb_joueurs=x ou x correspond a la limite superieure de nb de joueurs voulus
*/
Route::get('equipes',[EquipeController::class,'getEquipesAvecMoinsDeJoueurs']);

//Route qui retourne toutes les equipes
Route::get('equipes/all',[EquipeController::class,'getAllEquipes']);

/*Route qui retourne les informations sur un match en particulier
-Prend en parametre l'id du match
*/
Route::get('game/{id}',[GameController::class,'getGame']);

//Route qui retourne toutes les matchs
Route::get('games',[GameController::class,'getAllGames']);

/*Route qui retourne tout les matchs d'une equipe en particulier
-Prend en parametre l'id de l'equipe
*/
Route::get('game/equipe/{id}',[GameController::class,'getGameEquipe']);

/*Route qui retourne tout les matchs d'une ligue en particulier
-Prend en parametre l'id de la ligue
*/
Route::get('game/ligue/{id}',[GameController::class,'getGameLigue']);

//Route qui retoure les informations sur un gestionnaire de ligue en particulier
Route::get('gestionnaire/{id}',[GestionnaireController::class,'getGestionnaireLigue']);

//Route qui modifie une partie dans la base de donnee.
//Route::put('game/{id}',[GameController::class,'modifierGame']);
