import { Link } from "react-router";
import "./Home.css";

function Home() {
	return (
		<div>
			<h1>Bienvenue sur Zen Travel by ITM</h1>
			<p>Explorez différents pays et préparez votre voyage !</p>
			<button type="button" className="map-btn">
				<Link to="/interactive-map">Carte interactive</Link>
			</button>
		</div>
	);
}

export default Home;
