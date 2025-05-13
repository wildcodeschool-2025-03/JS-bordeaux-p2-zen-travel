import "./Checklist.css";
import { useEffect, useState } from "react";

interface EmergencyInterface {
	police: string;
	ambulance: string;
	pompiers: string;
}

interface DataChecklistItem {
	country: string;
	visa: string;
	vaccines: string;
	currency: string;
	plug: string;
	language: string;
	emergency: EmergencyInterface;
}

interface CountryProp {
	translations: Record<string, { common: string }>;
	flags: Record<string, string>;
}

interface ChecklistProps {
	country: CountryProp;
	isOpen: boolean;
	onClose: () => void;
}

function Checklist({ country, isOpen, onClose }: ChecklistProps) {
	const [dataChecklist, setDataChecklist] = useState<DataChecklistItem | null>(
		null,
	);

	useEffect(() => {
		async function fetchDataChecklist() {
			const response = await fetch(
				"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/db",
			);
			const data = await response.json();
			const countryName = country?.translations.fra.common;
			const allCountries = [
				{ name: "Maroc", index: 0 },
				{ name: "France", index: 1 },
				{ name: "États-Unis", index: 2 },
			];
			const selectedCountry = allCountries.find(
				(country) => country.name === countryName,
			);
			if (selectedCountry) {
				setDataChecklist(data.countries[selectedCountry.index]);
			}
		}
		fetchDataChecklist();
	}, [country]);

	const countryFlag = country?.flags.png;

	const items = [
		{
			id: 1,
			name: "Passeport en cours de validité",
		},
		{
			id: 2,
			name: `Visa : ${dataChecklist?.visa}`,
		},
		{
			id: 3,
			name: `Vaccins nécessaires : ${dataChecklist?.vaccines}`,
		},
		{
			id: 4,
			name: `Prévoir de la monnaie en ${dataChecklist?.currency}`,
		},
		{
			id: 5,
			name: `Adaptateur de prise électrique : ${dataChecklist?.plug}`,
		},
		{
			id: 6,
			name: `Traducteur de langue en ${dataChecklist?.language}`,
		},
		{
			id: 7,
			name: `Numéros d'urgence pour la Police ${dataChecklist?.emergency.police} /
            Ambulance ${dataChecklist?.emergency.ambulance} / Pompiers ${dataChecklist?.emergency.pompiers}`,
		},
	];

	return (
		<>
			{isOpen && (
				<article className="modal-checklist">
					<button type="button" id="close-btn" onClick={() => onClose()}>
						X
					</button>
					<div>
						<img src={countryFlag} alt="flag-picture" />
					</div>
					<div className="typewriter-container">
						<div className="typewriter">
							<h1>
								Préparer votre séjour : {country?.translations.fra.common}
							</h1>
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
			)}
		</>
	);
}

export default Checklist;
