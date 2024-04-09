<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Commentaire generaux: 
     * L'authentification se fait a l'aide de Sanctum, un systeme d'authentification built-in dans laravel.
     * L'authentification se fait sous la base d'un token identifiant qui est generer lorsque qu'un utilisateur
     * se cree un compte ou se connecte a un compte existant. Le token est detruit des que l'utilisateur se logout.
     * Etant donne qu'on utilise un token d'identification, on doit le fournir dans chaque requete qui le necessite dans le header
     * avec Authorization: Bearer <token> qui est envoye dans la reponse lors de la creation ou de la connection a son compte.
     * Il faut donc gerer le token dans le javascript et s'assurer de ne pas l'afficher. Le token est liee a un utilisateur specifique
     * dans la table personnal_access_token qui a ete generer automatiquement par Sanctum, il est donc possible d'avoir acces a champs de la table
     * utilisateur a partir du token Bearer.
     */

    //creation d'un utilisateur
    public function creerCompte(Request $requete){
        //validation des champs de la requete
        $champsValidee=$requete->validate([
            'nom'=>'required|string|max:100',
            'email'=>'required|string|max:255|unique:utilisateur,email', //le email doit etre unique dans la base de donnee
            'mot_de_passe'=>'required|string|min:9',
            'role_utilisateur'=>'nullable|string|in:visiteur,joueur,gestionnaire',
        ]);

        //creation de l'utilisateur dans le base de donnee
        $utilisateur=User::create([
            'nom'=>$champsValidee['nom'],
            'email'=>$champsValidee['email'],
            'mot_de_passe'=>bcrypt($champsValidee['mot_de_passe']),
            'role_utilisateur'=>$champsValidee['role_utilisateur']
        ]);

        $id = null;
        
        if($utilisateur->role_utilisateur == 'joueur'){
            $id = DB::table('joueur') -> select('id_joueur') -> where('courriel',$champsValidee['email']) -> first();
        }else if($utilisateur->role_utilisateur == 'gestionnaire'){
             $id = DB::table('gestionnaire_de_ligue') -> select('id_gestionnaire') -> where('courriel',$champsValidee['email']) -> first();
        }
        
        //creation d'un token d'identification propre a l'utilisateur et qui est valide jusqu'au logout
        $tokenIdentification=$utilisateur->createToken('tokenutilisateur')->plainTextToken;

        $reponse=[
            'utilisateur'=>$utilisateur,
            'token'=>$tokenIdentification,
        ];

        //envoyer la reponse.
        return response($reponse,201);
    }

    public function seDeconnecter(Request $requete){
        //deletion du token identifiant l'utilisateur.
        auth()->user()->tokens()->delete();

        return [
            'message'=>'Deconnecter avec succes'
        ];
    }

    public function seConnecter(Request $requete){
         //validation des champs de la requete
         $champsValidee=$requete->validate([
            'email'=>'required|string|max:255|',
            'mot_de_passe'=>'required|string|min:9',
        ]);

        //Verification du email dans la base de donne pour retrouver l'utilisateur
        $utilisateur=User::where('email',$champsValidee['email'])->first();

        //si l'utilisateur n'a pas ete trouve par son email, ou si le mot de passe fourni ne concorde pas avec le mot de passe dans la base de donnee.
        if(!$utilisateur || !Hash::check($champsValidee['mot_de_passe'],$utilisateur->mot_de_passe)){

            //envoyer un message d'erreur
            return response([
                'message'=>'Mauvais email ou mot de passe'
            ],401);
        }

        $id=null;
        
        if($utilisateur->role_utilisateur == 'joueur'){
            $id = DB::table('joueur') -> select('id_joueur') -> where('courriel',$champsValidee['email']) -> first();
            $id = $id ? $id->id_joueur : null;
        }else if($utilisateur->role_utilisateur == 'gestionnaire'){
            $id = DB::table('gestionnaire_de_ligue') -> select('id_gestionnaire') -> where('courriel',$champsValidee['email']) -> first();
            $id = $id ? $id->id_joueur : null;
        }
        
        //creation d'un token d'identification propre a l'utilisateur
        $tokenIdentification=$utilisateur->createToken('tokenutilisateur')->plainTextToken;

        $reponse=[
            'utilisateur'=>$utilisateur,
            'id'=>$id,
            'token'=>$tokenIdentification,
        ];

        //envoyer la reponse.
        return response($reponse,201);
    }
}
