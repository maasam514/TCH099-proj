import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

function BarreNav() {
    const [estConnecter, setEstConnecter] = useState(false);
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [tokenUtilisateur, setTokenUtilisateur] = useState('');
    const { pathname } = useLocation();
    const navigate = useNavigate();
    let data = [];
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Verrifier si le user est connecter
        const isLoggedIn = localStorage.getItem('id');
        if (isLoggedIn) {
            setEstConnecter(true);
        }
    }, []);

    const gererLaDeconnexion = async () => {
        try {
            const response = await fetch('https://tch-099-proj.vercel.app/api/api/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) {
                throw new Error('Echec lors de votre deconnexion');
            }

            setEstConnecter(false);
            setNomUtilisateur(null);
            setTokenUtilisateur(null);
            localStorage.removeItem('id');
            localStorage.removeItem('token');

            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la deconnexion de votre comptre: ', error);
        }
    }

    return (
        <nav>
            
                {!estConnecter && (
                    
                    <>
                    <Link to ="/" className="site-title" style={{ fontSize: '40px', marginBottom: '20px' }}>SoccerHub</Link>
                    <ul>
                        <li><Link to="/a-propos" className={pathname === "/a-propos" ? "actif" : ""}>À propos</Link></li>
                        <li><Link to="/parties" className={pathname === "/parties" ? "actif" : ""}>Parties</Link></li>
                        <li><Link to="/joueurs" className={pathname === "/joueurs" ? "actif" : ""}>Joueurs</Link></li>
                            <li><Link to="/ligues" className={pathname === "/ligues" ? "actif" : ""}>Ligues</Link></li>
                            
                        <li>
                            <Link to="/login">
                                <button>Se Connecter</button>
                            </Link>
                        </li>
                    </ul>
                    </>
                )}
                {estConnecter && (
                    
                
                    <> 
                    <Link  className="site-title" style={{ textAlign: 'left', fontSize: '40px', marginBottom: '20px' }}>SoccerHub</Link>
                    <ul>
                        <li><Link to="/a-propos" className={pathname === "/a-propos" ? "actif" : ""}>À propos</Link></li>
                        <li><Link to="/parties" className={pathname === "/parties" ? "actif" : ""}>Parties</Link></li>
                        <li><Link to="/joueurs" className={pathname === "/joueurs" ? "actif" : ""}>Joueurs</Link></li>
                        <li><Link to="/ligues" className={pathname === "/ligues" ? "actif" : ""}>Ligues</Link></li>
                        <li><Link to="/infoPersonnelle" className={pathname === "/infoPersonnelle" ? "actif" : ""}>Mes statistiques</Link></li>
                        <li><Link to="/match" className={pathname === "/match" ? "actif" : ""}>Mes Matchs</Link></li>
                        <li><button onClick={gererLaDeconnexion}>Se déconnecter</button></li>
                    </ul>
                    </>



                )}
            
        </nav>
    );
}

export default BarreNav;
