import { useEffect, useState } from "react";
import "./Climat.css";

interface Country {
	translations: { fra: { common: string } };
}

interface DataClimat {
	climate: { [key: string]: { average: number; rainfall: number } };
}

function Climat({ country }: { country: Country }) {
	const [dataClimat, setDataClimat] = useState<DataClimat | null>(null);

	useEffect(() => {
		async function fetchDataClimat() {
			const response = await fetch(
				"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/db",
			);
			const data = await response.json();

			const countryName = country.translations.fra.common;

			const allCountries = [
				{ name: "Maroc", index: 0 },
				{ name: "France", index: 1 },
				{ name: "États-Unis", index: 2 },
			];
			const selectedCountry = allCountries.find(
				(country) => country.name === countryName,
			);

			if (selectedCountry) {
				setDataClimat(data.countries[selectedCountry.index]);
			}
		}

		fetchDataClimat();
	}, [country]);

	const getWeatherIcon = (average: number, rainfall: number) => {
		const conditions = [
			{ condition: rainfall >= 90 && rainfall <= 150, icon: "🌧️" },
			{ condition: average < 8, icon: "❄️" },
			{ condition: rainfall > 80 && rainfall <= 60, icon: "🌦️" },
			{ condition: average >= 25, icon: "🔥" },
		];

		const match = conditions.find((c) => c.condition);
		return match?.icon || "☀️";
	};
	return (
		<div className="climat animation">
			{dataClimat?.climate ? (
				<>
					<h4>Météo moyenne par mois</h4>
					<div className="calendar ">
						{Object.entries(dataClimat.climate).map(([mois, data]) => (
							<div key={mois} className="period ">
								<div className="mounth">{mois} </div>
								<div className="icon">
									{getWeatherIcon(data.average, data.rainfall)}
								</div>
								<div className="average">{data.average} °C</div>
								<div className="rainfall">{data.rainfall} mm</div>
							</div>
						))}
					</div>
				</>
			) : (
				<div className="no-weather ">
					<h4>Climat non disponible</h4>
					<p className="no-data">
						Les données climatiques pour
						<span>{country.translations.fra.common}</span> ne sont pas encore
						disponibles.
					</p>
					<img
						src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDd1eHhkamxqeTh6NWt6dzZwdXo2bm91NnowdGppN2prbHJmM3Q2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W01Z6q9EfvfByNlai0/giphy.gif"
						alt="Climat inconnu"
						className="weather-gif"
					/>

					<p className="comming-soon">
						Notre équipe travaille pour les ajouter bientôt
					</p>
				</div>
			)}
		</div>
	);
}

export default Climat;
