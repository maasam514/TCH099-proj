import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BarreNav from './components/BarreNav';
import Acceuil from './components/Acceuil';
import APropos from './components/APropos';
import Parties from './components/Parties';
import Classements from './components/Classement';
import Joueurs from './components/Joueurs';
import Login from './components/Login';
import Registration from './components/Registration';
import './styles/index.css';

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
            <Route path="/classements" element={<Classements />} />
            <Route path="/joueurs" element={<Joueurs />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
 
          </Routes> 
        </div>
      </div>
    </Router> 
  );
}

export default App;
