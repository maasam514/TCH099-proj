import { useEffect, useState } from 'react'

export default function Joueur(){


  const [playerStats, setPlayerStats] = useState([]);
  const [teamPlayerStats, setTeamPlayerStats] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [leagueStats, setLeagueStats] = useState([]);

  useEffect(() => {
    fetchPlayerStats();
    fetchTeamPlayerStats();
    fetchTeamStats();
    fetchLeagueStats();
  }, []);

  async function fetchPlayerStats() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/statistique/joueur/1");
      const data = await response.json();
      setPlayerStats(data);
    } catch (error) {
      console.error('Error fetching player statistics:', error);
    }
  }

  async function fetchTeamPlayerStats() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/equipe/1/joueurs");
      const data = await response.json();
      setTeamPlayerStats(data);
    } catch (error) {
      console.error('Error fetching team player statistics:', error);
    }
  }

  async function fetchTeamStats() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/statistique/equipe/1");
      const data = await response.json();
      setTeamStats(data);
    } catch (error) {
      console.error('Error fetching team statistics:', error);
    }
  }

  async function fetchLeagueStats() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/ligue/1/equipes");
      const data = await response.json();
      setLeagueStats(data);
    } catch (error) {
      console.error('Error fetching league statistics:', error);
    }
  }


    useEffect(() => {
        const categoryLinks = document.querySelectorAll('#categories a');
        categoryLinks.forEach(link => {
          link.addEventListener('click', handleClick);
        cacheTasks()
        });
    
        return () => {
          categoryLinks.forEach(link => {
            link.removeEventListener('click', handleClick);
          });
        };
      }, []);
    
      function handleClick(event) {
        event.preventDefault();
        const categoryId = event.target.getAttribute('href').split('=')[1];
        cacheTasks();
        showTasksByCategory(categoryId);
      }
    
      function cacheTasks() {
        const tasks = document.querySelectorAll('#tasks li');
        tasks.forEach(task => {
          task.style.display = 'none';
        });
      }
    
      function showTasksByCategory(categoryId) {
        const tasks = document.querySelectorAll('#tasks li');
        tasks.forEach(task => {
          if (task.dataset.category === categoryId) {
            task.style.display = 'block';
          }
        });
      }
    
      return (
        <div>
          <center>
            <ul id="categories">
              <h2>Est-ce que vous voulez ...</h2>
              <li><a href="Statistique.html?categorie=1" id="StatsJoeurPerso">Vos statistiques</a></li>
              <li><a href="Statistique.html?categorie=2">Équipe statistique</a></li>
              <li><a href="Statistique.html?categorie=3">Ligue Rang</a></li>
            </ul>
          </center>
    
          <br />
    
          <ul id="tasks">
            <center>
              <li data-category="1">
                <br />
                <ul id="tasks">
                  <li data-category="1">
                    <div className="container">
                      <table className="table" id="statsJoueurTable">
                        <thead>
                          <tr>
                            <th>Buts</th>
                            <th>Passes</th>
                            <th>Carton Jaune</th>
                            <th>Carton Rouge</th>
                            <th>ID Joueur</th>
                            <th>ID Game</th>
                          </tr>
                        </thead>
                        <tbody>
                        {playerStats && Object.keys(playerStats).map((key, index) => (
                        <tr key={index}>
                            <td>{playerStats[key].nbButs}</td>
                            <td>{playerStats[key].nbPasses}</td>
                            <td>{playerStats[key].nbCartonJaune}</td>
                            <td>{playerStats[key].nbCartonRouge}</td>
                            <td>{playerStats[key].id_joueur}</td>
                            <td>{playerStats[key].id_game}</td>
                        </tr>
                    ))}
                        </tbody>
                      </table>
                    </div>
                  </li>
                </ul>
                <br />
              </li>
            </center>
          </ul>
    
          <ul id="tasks">
            <li data-category="2">
              <center><h2>Statistique des joueurs dans l'équipe</h2></center>
              <div className="container">
                <table className="table" id="statsEquipeTable">
                  <thead>
                    <tr>
                      <th>Rang</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Buts</th>
                      <th>Passes</th>
                      <th>Carton Jaune</th>
                      <th>Carton Rouge</th>
                    </tr>
                  </thead>
                  <tbody>
                  {teamPlayerStats && Object.keys(teamPlayerStats).map((key, index) => (
                        <tr key={index}>
                            <td>{teamPlayerStats[key].id_joueur}</td>
                            <td>{teamPlayerStats[key].nom}</td>
                            <td>{teamPlayerStats[key].prenom}</td>
                            <td>{teamPlayerStats[key].nbButs}</td>
                            <td>{teamPlayerStats[key].nbPasses}</td>
                            <td>{teamPlayerStats[key].nbCartonJaune}</td>
                            <td>{teamPlayerStats[key].nbCartonRouge}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
    
              <center><h2>Statistique de l'équipe</h2></center>
              <div className="container">
                <table className="table" id="statsEquipeJoueurTable">
                  <thead>
                    <tr>
                      <th>Victoires</th>
                      <th>Défaites</th>
                      <th>Null</th>
                      <th>Points</th>
                      <th>Buts Pour</th>
                      <th>Buts Contre</th>
                      <th>Matchs</th>
                    </tr>
                  </thead>
                  <tbody>
                  {teamStats && Object.keys(teamStats).map((key, index) => (
                        <tr key={index}>
                            <td>{teamStats[key].nbVictoires}</td>
                            <td>{teamStats[key].nbDefaites}</td>
                            <td>{teamStats[key].nbNuls}</td>
                            <td>{teamStats[key].nbPoints}</td>
                            <td>{teamStats[key].nbButsPour}</td>
                            <td>{teamStats[key].nbButsContre}</td>
                            <td>{teamStats[key].nbMatchs}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
    
          <br />
    
          <ul id="tasks">
            <li data-category="3">
              <center><h2>Statistique des équipes dans ta ligue</h2></center>
              <div className="container">
                <table className="table" id="statsLigueTable">
                  <thead>
                    <tr>
                      <th>Rang</th>
                      <th>Nom Équipe</th>
                      <th>Victoire</th>
                      <th>Défaite</th>
                      <th>Null</th>
                      <th>Points</th>
                      <th>Buts Pour</th>
                      <th>Buts Contre</th>
                      <th>Match Jouer</th>
                    </tr>
                  </thead>
                  <tbody>
                  {leagueStats && Object.keys(leagueStats).map((key, index) => (
                        <tr key={index}>
                            <td>{leagueStats[key].id_equipe}</td>
                            <td>{leagueStats[key].nom}</td>
                            <td>{leagueStats[key].nbVictoires}</td>
                            <td>{leagueStats[key].nbDefaites}</td>
                            <td>{leagueStats[key].nbNull}</td>
                            <td>{leagueStats[key].nbPoints}</td>
                            <td>{leagueStats[key].nbButsPour}</td>
                            <td>{leagueStats[key].nbButsContre}</td>
                            <td>{leagueStats[key].nbMatchs}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      );
}