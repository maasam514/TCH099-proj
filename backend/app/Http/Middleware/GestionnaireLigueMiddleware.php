<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GestionnaireLigueMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //verifier si le role_utilisateur de l'utilisateur provenant du token de la prochaine requete est de type gestionnaire, si c'est le cas, lui donne acces a la requete,
        //sinon envoyer un message d'erreur.
        if($request->user()->role_utilisateur !== 'gestionnaire'){
            return response()->json(['message' => 'Acces non autorisee'], 401);
        }
        
        return $next($request);
    }
}
