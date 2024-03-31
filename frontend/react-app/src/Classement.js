import React, { useState, useEffect } from "react";

function Classements() {
  // États locaux
  const [allLigues, setLigues] = useState([]);
  const [idLigueSelectionnee, setIdLigueSelectionnee] = useState(1);
  const [equipesFiltrer, setEquipesFiltrer] = useState([]);
  const [filtrerPar, setFiltrerPar] = useState({
    colonne: 'rang',
    ordre: 'asc',
  });

  /*** Effet pour charger les ligues au montage du composant ***/
  useEffect(() => {
    async function fetchLigues() {
      try {
        const liguesResponse = await fetch('https://tch-099-proj.vercel.app/api/api/ligues');
        if (!liguesResponse.ok) {
          throw new Error('Erreur dans la recuperation des ligues');
        }
        const liguesData = await liguesResponse.json();
        setLigues(liguesData);
      } catch (error) {
        console.error('Echec de la recuperation des ligues: ', error);
      }
    }
    fetchLigues();
  }, []);

  /*** Effet pour charger les équipes de la ligue sélectionnée et les trier ***/
  useEffect(() => {
    async function fetchEquipesLigue() {
      try {
        const equipesLigueResponse = await fetch(`https://tch-099-proj.vercel.app/api/api/ligue/${idLigueSelectionnee}/equipes`);
        if (!equipesLigueResponse.ok) {
          throw new Error('Erreur dans la recuperation des equipes de la ligue');
        }
        const equipesLigueData = await equipesLigueResponse.json();

        /*** Trie les données des équipes en fonction du nombre de points, du nombre de matchs joués,
        * et de la différence de buts, dans l'ordre suivant :
        * 1. Si le nombre de points est différent, trie en ordre décroissant selon le nombre de points.
        * 2. Si le nombre de points est égal, trie en ordre croissant selon le nombre de matchs joués.
        * 3. Si le nombre de points et le nombre de matchs joués sont égaux, trie en ordre décroissant
        *    selon la différence de buts.
        ***/
        equipesLigueData.sort((a, b) => {
          if (a.nb_point !== b.nb_point) {
            return b.nb_point - a.nb_point; 
          } else if (a.nb_match !== b.nb_match) {
            return a.nb_match - b.nb_match; 
          } else {
            return (b.but_pour - b.but_contre) - (a.but_pour - a.but_contre); 
          }
        });

        equipesLigueData.forEach((equipe, index) => {
          equipe.rang = index + 1;
        });

        setEquipesFiltrer(equipesLigueData);
        setFiltrerPar({ colonne: 'rang', ordre: 'asc' });
      } catch (error) {
        console.error('Echec dans la recuperation des equipes: ', error);
      }
    }
    fetchEquipesLigue();
  }, [idLigueSelectionnee]);

  /*** Gestionnaire pour changer la ligue sélectionnée ***/
  const handleChangementLigue = async (idLigue) => {
    setIdLigueSelectionnee(idLigue);
  }

  /*** Gestionnaire pour filtrer les équipes par colonne ***/
  const handleFiltrerEquipe = (nomColonne) => {
    filtrerData(nomColonne);
  }

  /*** Fonction pour filtrer les équipes ***/
  const filtrerData = (colonne) => {
    let ordre;
    ordre = filtrerPar.colonne === colonne && filtrerPar.ordre === 'desc' ? 'asc' : 'desc';

    setFiltrerPar({ colonne, ordre});
    const filtreEquipe = [...equipesFiltrer].sort((a, b) => {
      if(a[colonne] < b[colonne]) return ordre === 'asc' ? -1 : 1;
      if(a[colonne] > b[colonne]) return ordre === 'asc' ? 1 : -1;
      return 0;
    });
    setEquipesFiltrer(filtreEquipe);
  }

  // Rendu du composant
  return (
    <div className="conteneur">
      <section id="ligues">
        <h2>Ligues</h2>
        {allLigues.map((ligue, index) => (
          <button key={index} onClick={() => handleChangementLigue(ligue.id_ligue)}>{ligue.nom}</button>
        ))}
      </section>
      <section className="classement">
        <table>
            <caption>Classement des équipes</caption>
            <thead>
                <tr>
                    <th scope="col" className="rang"><button className="filtrer-rang" onClick={() => handleFiltrerEquipe('rang')} title="filtrer par rang">Rang</button></th>
                    <th scope="col" className="nom-equipe">Equipe</th>
                    <th scope="col" className="nb-parties"><button className="filtrer-nb-parties" onClick={() => handleFiltrerEquipe('nbParties')} title="filtrer par nombre de parties">Parties</button></th>
                    <th scope="col" className="nb-victories"><button className="filtrer-nb-victoires" onClick={() => handleFiltrerEquipe('nbVictoires')} title="filtrer par nombre de victoires">Victoires</button></th>
                    <th scope="col" className="nb-defaites"><button className="filtrer-nb-defaites" onClick={() => handleFiltrerEquipe('nbDefaites')} title="filtrer par nombre de defaites">Defaites</button></th>
                    <th scope="col" className="nb-nul"><button className="filtrer-nb-nul" onClick={() => handleFiltrerEquipe('nbEgalites')} title="filtrer par nombre d'egalite">Egalites</button></th>
                    <th scope="col" className="nb-points"><button className="filtrer-nb-points" onClick={() => handleFiltrerEquipe('nbPoints')} title="filtrer par nombre de points">Points</button></th>
                    <th scope="col" className="pourcentage-points"><button className="filtrer-pourcentage-points" onClick={() => handleFiltrerEquipe('pourcentagePoints')} title="filtrer par pourcentage de points">%Points</button></th>
                    <th scope="col" className="nb-buts-pour"><button className="filtrer-nb-buts-pour" onClick={() => handleFiltrerEquipe('nombreButsPour')} title="filtrer par nombre de buts pour">Buts pour</button></th>
                    <th scope="col" className="nb-buts-contre"><button className="filtrer-nb-buts-contre" onClick={() => handleFiltrerEquipe('nombreButsContre')} title="filtrer par nombre de buts cointre">Buts contre</button></th>
                    <th scope="col" className="differentiel"><button className="filtrer-differentiel" onClick={() => handleFiltrerEquipe('differentiel')} title="filtrer par differentiel">Differentiel</button></th>
                </tr>
            </thead>
            <tbody>
            {equipesFiltrer.map((equipe, index) => (
                <tr key={index}>
                    <td>{equipe.rang}</td>
                    <td>{equipe.nom}</td>
                    <td>{equipe.nb_match}</td>
                    <td>{equipe.nb_victoire}</td>
                    <td>{equipe.nb_defaite}</td>
                    <td>{equipe.nb_nul}</td>
                    <td>{equipe.nb_point}</td>
                    <td>{(equipe.nb_point / equipe.nb_match).toFixed(3)}</td>
                    <td>{equipe.but_pour}</td>
                    <td>{equipe.but_contre}</td>
                    <td style={{ color: equipe.but_pour - equipe.but_contre >= 0 ? 'green' : 'red' }}>
                        {equipe.but_pour - equipe.but_contre >= 0 ? "+" : "-"}
                        {Math.abs(equipe.but_pour - equipe.but_contre)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      </section>
    </div>
  );
}

export default Classements;