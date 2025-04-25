import "./ModalChecklist.css";
import { useEffect, useState } from "react";

function ModalChecklist() {
	const [countriesInfo, setCountriesInfo] = useState([]);

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

	return (
		<>
			<div className="modalChecklist">
				<img src="" alt={country.country} />
				<h1>🎒 Préparer votre voyage pour la {country.country}</h1>
				<ul>
					<li>
						<label>
							<input type="checkbox" />
							Passeport en cours de validité
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Visa : {country.visa}
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Vaccins nécessaires : {country.vaccines}
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Monnaie : {country.currency}
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Prise électrique : {country.plug}
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Langue : {country.language}
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" />
							Numéros d'urgence : Police {country.emergency.police} / Ambulance{" "}
							{country.emergency.ambulance} / Pompiers{" "}
							{country.emergency.pompiers}
						</label>
					</li>
				</ul>
				<button type="button">Valider ma checklist</button>
				<button type="button">Fermer</button>
			</div>
		</>
	);
}

export default ModalChecklist;
