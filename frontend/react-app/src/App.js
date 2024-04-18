import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BarreNav from './components/BarreNav';
import Acceuil from './components/Acceuil';
import APropos from './components/APropos';
import Parties from './components/Parties';
import Joueurs from './components/Joueurs';
import ProfilJoueur from './components/ProfilJoueur';
import Ligues from './components/Ligues';
import ClassementLigue from './components/ClassementLigue';
import Equipe from './components/Equipe';
import Login from './components/Login';
import Registration from './components/Registration';
import './styles/index.css';
import "./styles/style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <BarreNav />
        <div className="page">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/parties" element={<Parties />} />
            <Route path="/joueurs" element={<Joueurs />} />
            <Route path="/joueur/:joueurId" element={<ProfilJoueur />}/>
            <Route path="/ligues" element={<Ligues />}/>
            <Route path="/ligue/:id_ligue" element={<ClassementLigue />}/>
            <Route path="/equipe/:id_equipe" element={<Equipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes> 
        </div>
      </div>
    </Router> 
  );
}

export default App;
