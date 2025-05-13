import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, Outlet } from "react-router";
import "./App.css";

function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<header>
				<nav className="header-navbar">
					<Link to="/" className="logo">
						<img src="src/assets/logo.png" alt="logo" />
					</Link>
					<button
						type="button"
						className="burger-icon"
						onClick={() => setMenuOpen((prev) => !prev)}
					>
						{menuOpen ? <FiX /> : <FiMenu />}
					</button>
					<ul className={menuOpen ? "menu open" : "menu"}>
						<li>📞 +33 7 22 58 46 11</li>
						<li>🗨️ Une question ?</li>
					</ul>
				</nav>
			</header>

			<main>
				<Outlet />
			</main>

			<footer>&copy; Copyright 2025 by ITM.</footer>
		</>
	);
}

export default App;
