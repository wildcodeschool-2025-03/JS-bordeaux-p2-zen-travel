import "./Climat.css";
import { useFetchData } from "../DataFetch/DataFetch";

interface Country {
	translations: Record<string, { common: string }>;
}

interface DataClimat {
	climate: { [key: string]: { average: number; rainfall: number } };
}

function Climat({ country }: { country: Country }) {
	const dataClimat: DataClimat = useFetchData(country);

	function getWeatherIcon(average: number, rainfall: number) {
		if (rainfall >= 90 && rainfall <= 150) return "🌧️";
		if (average < 8) return "❄️";
		if (rainfall > 60 && rainfall <= 80) return "🌦️";
		if (average >= 25) return "🔥";
		return "☀️";
	}

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
						<span> {country.translations.fra.common}</span> ne sont pas encore
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
