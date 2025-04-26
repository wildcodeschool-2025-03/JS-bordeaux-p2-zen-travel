import "./ModalChecklist.css";
import { useEffect, useState } from "react";
import CountryFlag from "../CountryFlag/CountryFlag";

function ModalChecklist() {
	const [countriesInfo, setCountriesInfo] = useState([]);
	const [checkedBtn, setCheckedBtn] = useState(false);

	useEffect(() => {
		fetch(
			"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/db",
		)
			.then((response) => response.json())
			.then((data) => setCountriesInfo(data))
			.catch((err) => console.error("Erreur de fetch :", err));
	}, []);

	if (
		!countriesInfo ||
		!countriesInfo.countries ||
		countriesInfo.countries.length < 2
	) {
		return <h1>Chargement du pays...</h1>;
	}
	const country = countriesInfo.countries[1];

	function checked() {
		setCheckedBtn(!checkedBtn);
	}

	return (
		<>
			<div className="modalChecklist">
				<button type="button" id="closeBtn" onClick={() => {}}>
					X
				</button>
				<CountryFlag />
				<h1>🎒 Préparer votre voyage pour la {country.country}</h1>
				<ul>
					<li>
						<label>
							<input type="checkbox" onClick={checked} />
							<span
								style={
									checkedBtn
										? { textDecoration: "line-through", color: "#2c7a83" }
										: {}
								}
							>
								Passeport en cours de validité
							</span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" onClick={checked} />
							<span
								style={
									checkedBtn
										? { textDecoration: "line-through", color: "#2c7a83" }
										: {}
								}
							>
								Visa : {country.visa}
							</span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" onClick={checked} />
							<span
								style={
									checkedBtn
										? { textDecoration: "line-through", color: "#2c7a83" }
										: {}
								}
							>
								Vaccins nécessaires : {country.vaccines}
							</span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Prévoir de la monnaie en {country.currency}
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Adaptateur de prise électrique : {country.plug}
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Traducteur de langue en {country.language}
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Numéros d'urgence pour la Police {country.emergency.police} /
							Ambulance {country.emergency.ambulance} / Pompiers{" "}
							{country.emergency.pompiers}
						</label>
					</li>
				</ul>
				<button
					type="button"
					id="printBtn"
					onClick={() => {
						window.print();
					}}
				>
					Imprimer ma checklist
				</button>
			</div>
		</>
	);
}

export default ModalChecklist;
