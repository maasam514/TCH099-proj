import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BarreNav from './BarreNav';
import Acceuil from './Acceuil';
import APropos from './APropos';
import Parties from './Parties';
import Classements from './Classement';

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
          </Routes> 
        </div>
      </div>
    </Router>
  );
}

export default App;
