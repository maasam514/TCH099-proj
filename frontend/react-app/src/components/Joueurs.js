import { React } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BarreRecherche from "./BarreRecherche";

function Joueurs(){

    const fetchAllJoueurs = async () => {
        try{
            const allJoueursResponse = await fetch('https://tch-099-proj.vercel.app/api/api/joueurs');
            if(!allJoueursResponse.ok){
                throw new Error('Echec lors de la recuperation des joueurs');
            }
            const allJoueursData = await allJoueursResponse.json();
            const joueursFiltrer = allJoueursData.sort((a,b) =>{
                const comparaisonPrenom = a.prenom.localeCompare(b.prenom);
                if(comparaisonPrenom !==0 ){
                    return comparaisonPrenom;
                }
                return a.joueurNom.localeCompare(b.joueurNom);
            });
            return joueursFiltrer;
        }catch(error){
            throw new Error('Erreur lors de la recuperation des joueurs: ',error);
        }
    }

    const { data: allJoueurs, isLoading: isLoadingAllJoueurs } = useQuery({
        queryKey:"allJoueurs",
        queryFn: fetchAllJoueurs,
    });

    return(
        <div className="conteneur">
            <BarreRecherche />
            <section className="joueur-ordre-alphabetique">
                {isLoadingAllJoueurs ? (
                    <div>Chargement des joueurs</div>
                ): (<table className="tableau-joueurs">
                    <thead>
                        <tr>
                            <th className="nom-joueur">Nom du joueur</th>
                            <th className="equipe-joueur">Nom de l'equipe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allJoueurs && allJoueurs.map((joueur) => (
                            <tr key={joueur.id}>
                                <td>
                                    <Link to={`/joueur/${joueur.idJoueur}`}>
                                        {joueur.prenom} {joueur.joueurNom}
                                    </Link></td>
                                <td>{joueur.equipeNom}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
                
            </section>
        </div>
    );
}
export default Joueurs;
