import batiment from "../assets/images/batiment-igt.png";

function Home() {
  return (
    <main>
      <section className="hero">

        <img
          src={batiment}
          alt="Bâtiment IGT"
          className="hero-image"
        />

        <h2>Bienvenue sur InspecteurBot-IA</h2>

        <p>
          Votre assistant intelligent dédié à l'Inspection Générale du Travail.
        </p>

      </section>
    </main>
  );
}

export default Home;
