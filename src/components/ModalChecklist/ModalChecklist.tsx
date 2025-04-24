import "./ModalChecklist.css";
import { useEffect, useState } from "react";

function ModalChecklist() {
	const [countriesInfo, setCountriesInfo] = useState([]);

	useEffect(() => {
		fetch(
			"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/db",
		)
			.then((response) => response.json())
			.then((data) => setCountriesInfo(data));
	}, []);

	return (
		<>
			{countriesInfo.length > 2 ? (
				<h1>🎒 Préparer votre voyage pour le {countriesInfo[1].name.common}</h1>
			) : (
				<h1>Chargement du pays...</h1>
			)}
			<ul>
				<input type="checkbox" />
			</ul>
		</>
	);
}
export default ModalChecklist;
