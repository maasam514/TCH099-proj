<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    /* Cette classe permet l'interfacage entre l'api et la table utilisateur de la base de donnee.
    *  C'est grace a celle-ci que l'authentification se fait et que le systeme peut savoir si un utilisateur est authentifier.
    *  La table utilisateur pourra etre appele avec User directement.
    */
    use HasApiTokens, HasFactory, Notifiable;


    //Donne le bon nom de colonne pour la cle primaire au systeme
    protected $primaryKey = 'id_utilisateur';

    //Nom de la table dans laquelle inserer les nouveaux utilisateurs
    protected $table = 'utilisateur';

    //Valeur par defaut du champ role_utlisateur
    protected $attributes = [
        'role_utilisateur' => 'visiteur',
    ];
    /**
     * The attributes that are mass assignable. Les attributs de la table utilisateur que le systeme peut remplir
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
        'mot_de_passe',
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
