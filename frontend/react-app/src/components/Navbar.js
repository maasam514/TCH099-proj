const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#D22B2B' }}>
            <div className="container">
                <a className="navbar-brand text-white" href="#">SoccerStats</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active" style={{ marginRight: '1vw' }}>
                            <a className="nav-link text-white" href="#">Ligues</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '1vw' }}>
                            <a className="nav-link text-white" href="#">Joueurs</a>
                        </li>
                        <li className="nav-item" style={{ marginRight: '1vw' }}>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Recherche" aria-label="Search" />
                                <button className="btn btn-outline-light" type="submit" style={{ marginLeft: '1vw' }}>Rechercher</button>
                            </form>
                        </li>
                        <li className="nav-item" style={{ marginLeft: '1vw' }}>
                            <button type="button" className="btn btn-primary">Connection</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;