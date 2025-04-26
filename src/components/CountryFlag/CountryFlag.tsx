import "./CountryFlag.css";
import { useEffect, useState } from "react";

function CountryFlag() {
	const [flags, setFlags] = useState([]);

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/alpha/FR")
			.then((response) => response.json())
			.then((data) => setFlags(data))
			.catch((err) => console.error("Erreur de fetch :", err));
	}, []);

	if (flags.length === 0) {
		return <h1>chargement drapeau...</h1>;
	}

	const country = flags[0];
	console.log(country);

	return (
		<>
			<img src={country.flags.svg} alt={country.translations.fra.common} />
		</>
	);
}

export default CountryFlag;
