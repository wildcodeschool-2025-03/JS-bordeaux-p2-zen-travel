import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, Outlet } from "react-router";
import "./App.css";
import ContactBox from "./components/ContactBox/ContactBox";

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [showContactBox, setShowContactBox] = useState(false);
	const toggleContactBox = () => {
		setShowContactBox(!showContactBox);
	};

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
						<li>
							<button
								className="bouttonQuestion"
								type="button"
								onClick={toggleContactBox}
							>
								🗨️ Une question ?
							</button>
							{showContactBox && <ContactBox />}
						</li>
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
