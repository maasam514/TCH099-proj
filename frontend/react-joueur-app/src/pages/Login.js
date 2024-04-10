import { useRef, useState,useEffect } from "react";
import './Login.css'

import user_icon from '../Components/Assets/person.png'
import email_icon from '../Components/Assets/email.png'
import password_icon from '../Components/Assets/password.png'
import telephone_icon from '../Components/Assets/telephone.png'

export default function Login(){

    const [action, setAction] = useState("Login");



    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">

                {action==="Login" ? <div></div>:
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input type="text" placeholder="Prenom"/>
                </div>
                }

                {action==="Login" ? <div></div> :
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input type="text" placeholder="Nom"/>
                </div>
                }
                {action==="Login" ? <div></div> :
                <div className="input">
                    <img src={telephone_icon} alt=""/>
                    <input type="text" placeholder="Numéro Téléphone"/>
                </div>
                }
                <div className="input">
                    <img src={email_icon} alt=""/>
                    <input type="email" placeholder="Email"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt=""/>
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            {action==="Sign Up" ? <div></div>:
            <div className="forgot-password">Mots de passe oublié<span> Clicker ICI!</span></div>
            }
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray": "submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
        </div>
    )
    
}