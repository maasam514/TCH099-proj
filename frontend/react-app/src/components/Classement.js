import React, { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchLigues } from "../fetch/fetchLigues";
import '../styles/classement.css';

function Classements() {
  const [idLigueSelectionnee, setIdLigueSelectionnee] = useState(1);
  const [equipesEnOrdre, setEquipeEnOrdre] = useState([]);
  const [filtrerPar, setFiltrerPar] = useState({
    colonne: 'rang',
    ordre: 'asc',
  });

  /*** Effet pour charger les ligues au montage du composant ***/
  const { data: ligues, isLoading: isLoadingLigues, error: erreurLigues } = useQuery({
    queryKey: ['ligues'],
    queryFn: fetchLigues,
  });

  /*** Effet pour charger les équipes de la ligue sélectionnée et les trier ***/
  async function fetchEquipesLigue(idLigueSelectionne) {
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
        setEquipeEnOrdre(equipesLigueData);
        setFiltrerPar({ colonne: 'rang', ordre: 'asc' });
      } catch (error) {
        console.error('Echec dans la recuperation des equipes: ', error);
      }
  }

  const {data: equipesFiltrer, isLoading: isLoadingEquipesFiltrer, error: erreurEquipesFiltrer} = useQuery({
    queryKey: ['equipesFiltrer',idLigueSelectionnee],
    queryFn: fetchEquipesLigue,
    enabled: !!idLigueSelectionnee,
  });

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
    let ordre = filtrerPar.colonne === colonne && filtrerPar.ordre === 'desc' ? 'asc' : 'desc';

    setFiltrerPar({ colonne, ordre});
    const filtreEquipe = [...equipesEnOrdre].sort((a, b) => {
      if(a[colonne] < b[colonne]) return ordre === 'asc' ? -1 : 1;
      if(a[colonne] > b[colonne]) return ordre === 'asc' ? 1 : -1;
      return 0;
    });
    setEquipeEnOrdre(filtreEquipe);
  }

  useEffect(() => {
    if (equipesFiltrer) {
      setEquipeEnOrdre(equipesFiltrer);
    }
  }, [equipesFiltrer]);

  return (
    <div className="conteneur">
      <section id="ligues">
        <h2>Ligues</h2>
        {isLoadingLigues ?(
          <div>Chargement des ligues...</div>
        ): erreurLigues ?(
          <div>Erreur dans le chargement des ligues: {erreurLigues.message}</div>
        ): (
          ligues.map((ligue, index) => (
          <button key={index} onClick={() => handleChangementLigue(ligue.id_ligue)} className={idLigueSelectionnee === ligue.id_ligue ? 'ligueActive' : ''}>{ligue.nom}</button>
          ))
        )}
        
      </section>
      <section className="classement">
        <table>
            <caption>Classement des équipes</caption>
            <thead>
                <tr>
                    <th scope="col" className="rang">
                      <button className="filtrer-rang" onClick={() => handleFiltrerEquipe('rang')} title="filtrer par rang">Rang{filtrerPar.colonne === 'rang' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="nom-equipe">
                      Equipe
                    </th>
                    <th scope="col" className="nb-parties">
                      <button className="filtrer-nb-parties" onClick={() => handleFiltrerEquipe('nbParties')} title="filtrer par nombre de parties">Parties{filtrerPar.colonne === 'nbParties' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="nb-victories">
                      <button className="filtrer-nb-victoires" onClick={() => handleFiltrerEquipe('nbVictoires')} title="filtrer par nombre de victoires">Victoires{filtrerPar.colonne === 'nbVictoires' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="nb-defaites">
                      <button className="filtrer-nb-defaites" onClick={() => handleFiltrerEquipe('nbDefaites')} title="filtrer par nombre de defaites">Defaites{filtrerPar.colonne === 'nbDefaites' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="nb-nul">
                      <button className="filtrer-nb-nul" onClick={() => handleFiltrerEquipe('nbEgalites')} title="filtrer par nombre d'egalite">Egalites{filtrerPar.colonne === 'nbEgalites' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="nb-points">
                      <button className="filtrer-nb-points" onClick={() => handleFiltrerEquipe('nbPoints')} title="filtrer par nombre de points">Points{filtrerPar.colonne === 'nbPoints' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="pourcentage-points">
                      <button className="filtrer-pourcentage-points" onClick={() => handleFiltrerEquipe('pourcentagePoints')} title="filtrer par pourcentage de points">%Points{filtrerPar.colonne === 'pourcentagePoints' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="nb-buts-pour">
                      <button className="filtrer-nb-buts-pour" onClick={() => handleFiltrerEquipe('nombreButsPour')} title="filtrer par nombre de buts pour">Buts pour{filtrerPar.colonne === 'nombreButsPour' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="nb-buts-contre">
                      <button className="filtrer-nb-buts-contre" onClick={() => handleFiltrerEquipe('nombreButsContre')} title="filtrer par nombre de buts cointre">Buts contre{filtrerPar.colonne === 'nombreButsContre' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                    <th scope="col" className="differentiel">
                      <button className="filtrer-differentiel" onClick={() => handleFiltrerEquipe('differentiel')} title="filtrer par differentiel">Differentiel{filtrerPar.colonne === 'differentiel' && <span className={`arrow ${filtrerPar.ordre === 'asc' ? 'asc' : 'desc'}`}></span>}</button>
                    </th>
                </tr>
            </thead>
            <tbody>
            {isLoadingEquipesFiltrer ?(
              <div>Equipes en chargement...</div>
            ): erreurEquipesFiltrer ?(
              <div>Erreur dans le chargement des equipes: {erreurEquipesFiltrer.message}</div>
            ): Array.isArray(equipesEnOrdre) && equipesEnOrdre.length > 0 ?(
              equipesEnOrdre.map((equipe, index) => (
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
            ))
          ): equipesEnOrdre != null ?(
            <div>Aucune equipe pour cette ligue</div>
          ):null}
            </tbody>
        </table>
      </section>
    </div>
  );
}

export default Classements;