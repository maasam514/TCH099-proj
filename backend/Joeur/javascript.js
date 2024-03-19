

//////////////////////////////////////////  Page Statistique /////////////////////////////////////////////////////

function calculPointsJoeur(nbCartonjaune,nbCartonRouge, nbButs, nbAssist  ){

    //Calculer les points d'un joeur (buts +2; Assist +1; Carton jaune -1 but two yellow is -3; Carton rouge -4) avec le nombre de points qu'il obtient

    let cartonJaune = nbCartonjaune;
    let cartonRouge = nbCartonRouge;
    let buts = nbButs;
    let assist = nbAssist;
    let points = 0;

    points = buts * 2 + assist + cartonRouge * -4;
    if (cartonJaune > 2 ){
        points += (cartonJaune/2) * - 3;
    }

    return points; 
    
    
}

function calculPointsEquipe(nbWins, nbLoss, nbTies){

    //Calculer les points d'une equipe avec Wins 3, Loss 0, Ties 1
    let wins = nbWins;
    let loss = nbLoss;
    let ties = nbTies;
    let points = 0;

    points = wins * 3 + loss * 0 + ties * 1;

    return points;
    

}

function afficheEquipeUser(){       

    //Affiche les joeurs de son equipe avec les stats plus le rang
    //algorithme qui affiche les joeurs en DESC du rang

    //From Database compare chaque joeur 
    //while ($row = $valeur->fetch(PDO::FETCH_ASSOC)) {
      //  $row['Wins']
    //}
    calculPointsJoeur(cartonJaune, cartonRouge, buts, assist);

    


}

function afficheEquipeGlobal(){     

    //Affiche toute les equipes avec leur rangs, leur points et leur nom
    //algorithme qui affiche les joeurs en DESC du rang


}

function afficheJoeurGlobal(){       

    //Affiche toute les joeurs du site avec leur rang, leur points et leur nom
    //algorithme qui affiche les joeurs en DESC du rang

}

function afficheUser(){     

    //Affiche les stats personnelles du joeurs avec personalization design

}

///////////////////////////////////////      Page MATCH     /////////////////////////////////////////////////////


function afficheMatchFutur(){

    //Affiche les match futur du user avec la data

}

function afficheMatchPrecedent(){

    //Affiche les match passer du user avec les resulats

}

//La fin si j'ai du temps

function afficheEquipeManqueJoeur(){

    //Affiche toutes les equipes qui manque de joeurs


}

//////////////////////////////////////////  Page Info Perso    /////////////////////////////////////////////////////

function afficheInformationPersonnelle(){

    //Affiche les informations personelles du users Sign Out, nom, adresse email, Delete Account

}



//////////////////////////////////////////          Page Equipe        /////////////////////////////////////////////////////

//La fin j'arrive avoir le temps

function afficheEquipeManqueJoeurDemander(){

    //Dans le search bar si il veut trouver une equipe specifique et l'afficher pour lui avec le nom de cette Equipe
    //Mettre aussi le nom du capitaine et son numero de telephone

}