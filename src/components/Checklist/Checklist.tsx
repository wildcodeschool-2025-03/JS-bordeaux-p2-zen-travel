import "./Checklist.css";
import { useEffect, useState } from "react";
import CountryFlag from "../CountryFlag/CountryFlag";

interface EmergencyInterface {
	police: string;
	ambulance: string;
	pompiers: string;
}

interface CountryInterface {
	country: string;
	visa: string;
	vaccines: string;
	currency: string;
	plug: string;
	language: string;
	emergency: EmergencyInterface;
}

interface CountriesInfoInterface {
	countries: CountryInterface[];
}

function Checklist() {
	const [countriesInfo, setCountriesInfo] =
		useState<CountriesInfoInterface | null>(null);

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

	const items = [
		{
			id: 1,
			name: "Passeport en cours de validité",
		},
		{
			id: 2,
			name: `Visa : ${country.visa}`,
		},
		{
			id: 3,
			name: `Vaccins nécessaires : ${country.vaccines}`,
		},
		{
			id: 4,
			name: `Prévoir de la monnaie en ${country.currency}`,
		},
		{
			id: 5,
			name: `Adaptateur de prise électrique : ${country.plug}`,
		},
		{
			id: 6,
			name: `Traducteur de langue en ${country.language}`,
		},
		{
			id: 7,
			name: `Numéros d'urgence pour la Police ${country.emergency.police} /
			Ambulance ${country.emergency.ambulance} / Pompiers ${country.emergency.pompiers}`,
		},
	];

	return (
		<>
			<article className="modal-checklist">
				<button type="button" id="close-btn">
					X
				</button>
				<CountryFlag />
				<div className="typewriter-container">
					<div className="typewriter">
						<h1>🎒 Préparer votre séjour : {country.country}</h1>
					</div>
				</div>
				<ul>
					{items.map((item) => (
						<li key={item.id}>
							<label htmlFor={`item-${item.id}`}>
								<input type="checkbox" id={`item-${item.id}`} />
								<span>{item.name}</span>
							</label>
						</li>
					))}
				</ul>
				<button
					type="button"
					id="print-btn"
					onClick={() => {
						window.print();
					}}
				>
					Imprimer ma check-list
				</button>
			</article>
		</>
	);
}

export default Checklist;
