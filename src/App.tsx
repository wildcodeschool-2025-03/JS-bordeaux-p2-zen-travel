import { Link, Outlet } from "react-router";
import "./App.css";
import "./components/Checklist/Checklist";
import Checklist from "./components/Checklist/Checklist";

function App() {
	return (
		<>
			<nav>
				<Link to="/">Page d'accueil</Link>
				<Link to="/interactive-map">Carte interactive</Link>
			</nav>

			<main>
				<Outlet />
				<Checklist />
			</main>

			<footer>&copy; Copyright 2025 by ITM.</footer>
		</>
	);
}

export default App;
