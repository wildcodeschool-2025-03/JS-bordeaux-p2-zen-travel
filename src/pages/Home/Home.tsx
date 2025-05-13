import { Link } from "react-router";
import "./Home.css";

function Home() {
	return (
		<div>
			<h1>Bienvenue sur Zen Travel by ITM</h1>
			<p>Explorez différents pays et préparez votre voyage !</p>

			<Link to="/interactive-map" className="map-btn">
				Carte interactive
			</Link>
		</div>
	);
}

export default Home;
