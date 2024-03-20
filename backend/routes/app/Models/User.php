<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    //Differentes classes d'utilisateurs de l'application
    const ROLE_VISITEUR='visiteur';
    const ROLE_JOUEUR='joueur';
    const ROLE_GESTIONNAIRE='gestionnaire';

    //Donne le bon nom de colonne pour la cle primaire.
    protected $primaryKey = 'id_utilisateur';

    //Nom de la table dans laquelle inserer les nouveaux utilisateurs
    protected $table = 'utilisateur';

    //Valeur par defaut du champ role_utlisateur
    protected $attributes = [
        'role_utilisateur' => 'visiteur',
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'role_utilisateur',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


}
