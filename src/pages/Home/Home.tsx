import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
	return (
		<section className="home-container">
			<div className="image-section">
				<img
					src="src/assets/images/home.jpg"
					alt="Voyage"
					className="home-img"
				/>
				<div className="bg-shape" />
			</div>

			<div className="content-section">
				<h1 className="title">Explorez le monde avec Zen Travel by ITM ✈️ </h1>
				<p className="subtitle slogan">Découvrez. Préparez. Partez.</p>
				<p className="description">
					👋 Préparez votre prochain voyage avec style.
					<br />
					<br />🧭 Infos culturelles et pratiques
					<br />🍜 Recettes locales & découvertes culinaires
					<br />
					☀️ Données météorologiques
					<br />💡 Conseils pratiques
					<br />
					🗺️ Lieux magiques à ne pas manquer
					<br />✅ Checklists interactives
					<br />
					<br />
					<span className="zen-travel">Zen Travel</span>, c’est votre compagnon
					de voyage.
				</p>

				<Link to="/interactive-map" className="map-btn">
					🧭 Explorer maintenant
				</Link>
			</div>
		</section>
	);
}

export default Home;
