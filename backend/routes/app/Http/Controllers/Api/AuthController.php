<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //creation d'un utilisateur
    public function creerCompte(Request $requete){
        //validation des champs de la requete
        $champsValidee=$requete->validate([
            'nom'=>'required|string|max:100',
            'email'=>'required|string|max:255|unique:utilisateur,email',
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
        
        //creation d'un token d'identification propre a l'utilisateur
        $tokenIdentification=$utilisateur->createToken('tokenutilisateur')->plainTextToken;
        echo $tokenIdentification;

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

        if(!$utilisateur || !Hash::check($champsValidee['mot_de_passe'],$utilisateur->mot_de_passe)){
            return response([
                'message'=>'Mauvais email ou mot de passe'
            ],401);
        }
        
        //creation d'un token d'identification propre a l'utilisateur
        $tokenIdentification=$utilisateur->createToken('tokenutilisateur')->plainTextToken;

        $reponse=[
            'utilisateur'=>$utilisateur,
            'token'=>$tokenIdentification,
        ];

        //envoyer la reponse.
        return response($reponse,201);
    }
}
