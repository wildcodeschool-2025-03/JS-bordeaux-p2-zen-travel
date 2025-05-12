import { Link, Outlet } from "react-router";
import "./App.css";
import "./components/Checklist/Checklist";
import Checklist from "./components/Checklist/Checklist";

function App() {
	return (
		<>
			<header>
				<nav className="header-navbar">
					<Link to="/" className="logo">
						<img src="src/assets/logo.png" alt="logo" />
					</Link>
					<ul>
						<li>📞 +33 7 22 58 46 11</li>
						<li>🗨️ Une question ?</li>
					</ul>
				</nav>
			</header>

			<main>
				<Outlet />
				<Checklist />
			</main>

			<footer>&copy; Copyright 2025 by ITM.</footer>
		</>
	);
}

export default App;
