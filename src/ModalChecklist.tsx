import "./ModalChecklist.css";
import { useEffect, useState } from "react";

function ModalChecklist() {
	const [countriesName, setCountriesName] = useState([]);

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((response) => response.json())
			.then((data) => setCountriesName(data));
	}, []);

	return (
		<>
			{countriesName.map((country, index) => (
				<h1 key={index}>
					🎒 Préparer votre voyage pour {country.name?.common}
				</h1>
			))}
			;
		</>
	);
}
export default ModalChecklist;
