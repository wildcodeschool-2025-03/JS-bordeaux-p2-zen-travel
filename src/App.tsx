import "./App.css";
import { useEffect, useState } from "react";
import MainCard from "./components/MainCard";

function App() {
	const [country, setCountry] = useState(null);

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((response) => response.json())
			.then((data) => setCountry(data[50]))
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<div>
				{country ? (
					<div>
						<img
							className="flagCountries"
							src={country.flags.png}
							alt={`Flag of ${country.name.common}`}
							width="150"
						/>
						<MainCard />
						<h2>{country.name.common}</h2>
						<p>Capital: {country.capital?.[0]}</p>
						<p>Region: {country.region}</p>
						<p>Population: {country.population.toLocaleString()}</p>
					</div>
				) : (
					<p>Désolé,le pays selectionné n'est pas dans la liste!</p>
				)}
			</div>
			<div>
				<button type="button">Pack ta valise</button>
			</div>
		</>
	);
}

export default App;
