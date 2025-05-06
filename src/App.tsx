import { Link, Outlet } from "react-router";
import "./App.css";
import Gastronomy from "./components/Gastronomy/Gastronomy";

function App() {
	return (
		<>
			<nav>
				<Link to="/">Page d'accueil</Link>
				<Link to="/interactive-map">Carte interactive</Link>
			</nav>

			<main>
				<Outlet />
				<Gastronomy />
			</main>

			<footer>&copy; Copyright 2025 by ITM.</footer>
		</>
	);
}

export default App;
