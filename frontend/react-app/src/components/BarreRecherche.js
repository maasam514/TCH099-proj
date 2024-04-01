import React, {useState, useEffect} from "react";

function BarreRecherche(){
    const [nomJoueur, setNomJoueur] = useState([]);
    const [allJoueurs, setAllJoueurs] = useState([]);

    useEffect(() => {
        const fetchJoueur = async () => {
            try {
                const informationsJoueursResponse = await fetch('https://tch-099-proj.vercel.app/api/api/joueurs');
                if (!informationsJoueursResponse.ok) {
                    throw new Error('Echec lors de la récupération des joueurs');
                }

                const informationsJoueursData = await informationsJoueursResponse.json();
                setAllJoueurs(informationsJoueursData);
            } catch (error) {
                console.error('Erreur dans la récupération des joueurs: ', error);
            }
        };

        fetchJoueur();
    }, []);

    const changementBarreRecherche = (event) =>{
        setNomJoueur(event.target.value);
    };

    const joueursFiltrer = allJoueurs.filter((joueur) => 
        joueur.nom.toLowerCase().includes(nomJoueur.toLowerCase()) || joueur.prenom.toLowerCase().includes(nomJoueur.toLowerCase())
    );

    return(
        <div>
            <input type="text" placeholder="Recherche d'un joueur" value={nomJoueur} onChange={changementBarreRecherche}/>
            <ul>
                {joueursFiltrer.map((joueur)=>
                <li key={joueur.id_joueur}>
                    <span className="prenom">{joueur.prenom}</span>
                    <span className="nom">{joueur.nom}</span>
                </li>
                )}
            </ul>
        </div>
    );
}
export default BarreRecherche;