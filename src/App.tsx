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
								className="btn-question"
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

			<footer className="footer">
				<p className="text-footer">© 2025 Zen Travel. Tous droits réservés.</p>
				<div className="footer-socials">
					<a href="https://instagram.com" target="_blank" rel="noreferrer">
						<img
							src="src/assets/images/imageSocial/instagram.png"
							alt="Instagram"
						/>
					</a>
					<a href="https://facebook.com" target="_blank" rel="noreferrer">
						<img
							src="src/assets/images/imageSocial/facebook.png"
							alt="Facebook"
						/>
					</a>
					<a href="https://twitter.com" target="_blank" rel="noreferrer">
						<img
							src="src/assets/images/imageSocial/twitter.png"
							alt="Twitter"
						/>
					</a>
				</div>
			</footer>
		</>
	);
}

export default App;
