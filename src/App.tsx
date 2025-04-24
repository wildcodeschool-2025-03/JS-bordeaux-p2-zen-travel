import { Link, Outlet } from "react-router";
import "./App.css";
import "./ModalChecklist";
import ModalChecklist from "./ModalChecklist";

function App() {
	return (
		<>
			<ModalChecklist />
			<nav>
				<Link to="/">Page d'accueil</Link>
				<Link to="/interactive-map">Carte interactive</Link>
			</nav>

			<main>
				<Outlet />
			</main>

			<footer>&copy; Copyright 2025 by ITM.</footer>
		</>
	);
}

export default App;
