

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

function searchBarEquipe(){
    
}