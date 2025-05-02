import { Link, Outlet } from "react-router";
import "./App.css";
import "./components/ModalChecklist/ModalChecklist";
import ModalChecklist from "./components/ModalChecklist/ModalChecklist";

function App() {
	return (
		<>
			<nav>
				<Link to="/">Page d'accueil</Link>
				<Link to="/interactive-map">Carte interactive</Link>
			</nav>

			<main>
				<Outlet />
				<ModalChecklist />
			</main>

			<footer>&copy; Copyright 2025 by ITM.</footer>
		</>
	);
}

export default App;
