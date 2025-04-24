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
			{countriesName.length > 18 ? (
				<h1>
					🎒 Préparer votre voyage pour le {countriesName[18].name.common}
				</h1>
			) : (
				<h1>Chargement du pays...</h1>
			)}
		</>
	);
}
export default ModalChecklist;
