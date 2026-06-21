import batiment from "../assets/images/batiment-igt.png";

function Home() {
  return (
    <main className="home">

      <section className="hero">

        <img
          src={batiment}
          alt="Bâtiment de l'Inspection Générale du Travail"
          className="hero-image"
        />

        <div className="hero-content">
          <h2>Bienvenue sur InspecteurBot-IA</h2>

          <p>
            Votre assistant intelligent dédié à l'Inspection Générale du Travail.
          </p>

          <button className="btn">
            Commencer
          </button>
        </div>

      </section>

      <section className="cards">

        <div className="card">
          <h3>📚 Code du Travail</h3>
          <p>
            Consultez rapidement les dispositions du Code du Travail.
          </p>
        </div>

        <div className="card">
          <h3>🤖 Assistant IA</h3>
          <p>
            Posez vos questions et obtenez des réponses instantanées.
          </p>
        </div>

        <div className="card">
          <h3>📄 Rapports</h3>
          <p>
            Générez et gérez facilement vos rapports d'inspection.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Home;
