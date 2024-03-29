import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateEquipe from "./components/CreateEquipe";
import CreateLigue from "./components/CreateLigue";
import ModifierLigue from "./components/ModifierLigue.js";

function App(){
  return(
    
      <div className="App">
        <Navbar />
        <div className="content">
          <CreateEquipe />
          <CreateLigue />
          
        </div>
      </div>
    
  );
}

export default App;