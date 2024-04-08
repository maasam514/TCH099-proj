import { useEffect, useState } from 'react';

export default function Match(){

  const [futureMatches, setFutureMatches] = useState([]);
  const [previousMatches, setPreviousMatches] = useState([]);
 

  useEffect(() => {
    async function fetchFutureMatches() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/game/equipe/1");
        const data = await response.json();
        setFutureMatches(data.parties);
      } catch (error) {
        console.error("Error fetching future matches:", error);
      }
    }

    async function fetchPreviousMatches() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/game/equipe/2");
        const data = await response.json();
        setPreviousMatches(data.parties);
      } catch (error) {
        console.error("Error fetching previous matches:", error);
      }
    }

    fetchFutureMatches();
    fetchPreviousMatches();
  }, []);

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
      
      <ul id="categories">
        <h2>Est-ce que vous voulez vos...</h2>
        <li><a href="Match.php?categorie=1">Match avenir</a></li>
        <li><a href="Match.php?categorie=2">Match précédents</a></li>
      </ul>

      <ul id="tasks">
        <li data-category={1}>
          <div className="container" id="MatchAvenir">
            {futureMatches.map((match, index) => (
              <div key={index} className="bubble">
                <p><strong>Date:</strong> {match.dateGame}</p>
                <p><strong>Lieu:</strong> {match.lieu}</p>
                <p><strong>Adversaire:</strong> {match.equipeContre}</p>
              </div>
            ))}
          </div>
        </li>

        <li data-category={2}>
          <div className="container" id="MatchPasser">
            {previousMatches.map((match, index) => (
              <div key={index} className="bubble">
                <p><strong>Date:</strong> {match.dateGame}</p>
                <p><strong>Lieu:</strong> {match.lieu}</p>
                <p><strong>Adversaire:</strong> {match.equipeContre}</p>
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
}