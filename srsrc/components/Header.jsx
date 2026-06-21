import logo from "../assets/images/logo-igt.png";

function Header() {
  return (
    <header className="header">

      <div className="logo-container">
        <img
          src={logo}
          alt="Logo IGT"
          className="logo"
        />

        <div>
          <h1>INSPECTEURBOT-IA</h1>
          <p>Inspection Générale du Travail</p>
        </div>
      </div>

      <nav>
        <ul className="menu">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Lois</a></li>
          <li><a href="#">Conventions</a></li>
          <li><a href="#">Actualités</a></li>
          <li><a href="#">Assistant IA</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

    </header>
  );
}

export default Header;
