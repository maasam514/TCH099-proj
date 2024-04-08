import { useImperativeHandle } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar(){
    return <nav className="nav">
        <Link to="/statistique_joueur" className="site-title"> Joueur</Link>
        
        <ul>
            <CustomLink to="/match"> Match</CustomLink>
            <CustomLink to="/equipe"> Equipe</CustomLink>
            <CustomLink to="/info_personnelle"> Information Personelle</CustomLink>
            
        </ul>
    </nav>
}

function CustomLink ({ to,children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end:true}) //Match the entire url to match /pricing == /pricing and not /pricing != /pricing/todos
    return (
        <li className={isActive ? "active" : ""} >
            <Link to={to}{...props}>{children}</Link>
        </li>

    )
}