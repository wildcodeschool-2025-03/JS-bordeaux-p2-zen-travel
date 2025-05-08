import "./Places.css";
import { useEffect } from "react";

function Places() {
	useEffect(() => {
		fetch(
			"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/countries",
		)
			.then((response) => response.json())
			.then((data) => console.log(data[2]))
			.catch((err) => console.error(err));
	}, []);

	return <h1>Lieux à visiter</h1>;
}

export default Places;
