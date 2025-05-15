import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, Outlet } from "react-router";
import "./App.css";
import ContactBox from "./components/ContactBox/ContactBox";
import "./components/Checklist/Checklist";

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

			<footer className="simple-footer">
				<p>© 2025 Zen Travel. Tous droits réservés.</p>
				<div className="footer-socials">
					<a href="https://instagram.com" target="_blank" rel="noreferrer">
						<img src="src/assets/instagram.svg" alt="Instagram" />
					</a>
					<a href="https://facebook.com" target="_blank" rel="noreferrer">
						<img src="src/assets/facebook.svg" alt="Facebook" />
					</a>
					<a href="https://twitter.com" target="_blank" rel="noreferrer">
						<img src="src/assets/twitter.svg" alt="Twitter" />
					</a>
				</div>
			</footer>
		</>
	);
}

export default App;
