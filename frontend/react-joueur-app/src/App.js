import Navbar from './Navbar';
import Equipe from './pages/Equipe';
import Joueur from './pages/Joueur';
import Match from './pages/Match';
import Login from './pages/Login';
import Information_Personnelle from './pages/Information_Personnelle';
import Login_PT2 from './pages/Login_PT2';
import Registration from './pages/Registration';
import { Route, Routes, useLocation } from "react-router-dom";

function App() {

  const location = useLocation();

  // C'est les chemin qui contien le navbar
  //const navbarVisible = ['/statistique_joueur', '/equipe', '/match', '/info_personnelle'];

  // Fonction qui verifie quel chemin le navbar devrait etre visible
  //const DisplayNavbar = (path) => {
    //return navbarVisible.includes(path);
  //};

  // Determine whether to show the Navbar based on the current route
  const showNavbar = !['/login_pt2', '/registration'].includes(location.pathname);

  return (
    <>
    
      {/* Conditionally render the Navbar */}
      {showNavbar && <Navbar />}

  {/* Routes component contains all route definitions */}
      <Routes>
        <Route path="/statistique_joueur" element={<Joueur />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/match" element={<Match />} />
        <Route path="/info_personnelle" element={<Information_Personnelle />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/login_pt2" element={<Login_PT2 />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
