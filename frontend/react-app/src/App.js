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
import CreateEquipe from './components/CreateEquipe';
import CreateLigue from './components/CreateLigue';
import CreateMatch from './components/CreateMatch';
import FaceAFace from './components/FaceAFace';
import InfoPersonnelle from './components/InfoPersonnelle';
import Match from './components/Match';
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
            <Route path="/ligue/:idLigue" element={<ClassementLigue />}/>
            <Route path="/equipe/:idEquipe" element={<Equipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/creerEquipe/:idLigue" element={<CreateEquipe />} />
            <Route path="/creerLigue" element={<CreateLigue />} />
            <Route path="/creerPartie/:idLigue" element={<CreateMatch />} />
            <Route path="/partie/:idGame" element={<FaceAFace />} />
            <Route path="/infoPersonnelle" element={<InfoPersonnelle />} />
            <Route path="/match" element={<Match />} />
          </Routes> 
        </div>
      </div>
    </Router> 
  );
}

export default App;
