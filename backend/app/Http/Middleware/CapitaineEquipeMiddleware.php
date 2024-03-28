<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CapitaineEquipeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //verifier si le role_utilisateur de l'utilisateur provenant du token de la prochaine requete est de type joueur et si il est le capitaine de son equipe, si c'est le cas, lui donne acces a la requete,
        //sinon envoyer un message d'erreur.(TODO: LIER LE COMPTE UTILISATEUR D"UN JOUEUR AVEC SON ID JOUEUR POUR SAVOIR S'IL EST LE CAPITAINE SOIT EN AJOUTANT UN CHAMP ID UTILISATEUR DANS LA TABLE JOUEUR)
        // if($request->user()->role_utilisateur !== 'joueur' &&  ){
        //     return response()->json(['message' => 'Acces non autorisee'], 401);
        // }

        return $next($request);
    }
}
