import "./Gastronomy.css";
import "../Slider/Slider.css";
import { useEffect, useState } from "react";
import Slider from "../Slider/Slider.tsx";

interface DishInterface {
	id: string;
	name: string;
	description: string;
	picture: string;
}

interface CountryInterface {
	country: string;
	typical_dishes: DishInterface[];
}

interface CountriesInfoInterface {
	countries: CountryInterface[];
}

function Gastronomy() {
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
	const country = countriesInfo.countries[0];

	return (
		<article className="gastronomy-body">
			<h1>Plats Typiques</h1>
			<Slider />
			<div className="dishes">
				{country.typical_dishes.slice(0, 3).map((dish) => (
					<div key={dish.id} className="dish-card">
						<img
							src={`src/img/${dish.picture}`}
							alt="typical-dish-picture"
							id={`dish-${dish.id}`}
						/>
						<h2>{dish.name}</h2>
						<p>{dish.description}</p>
					</div>
				))}
			</div>
		</article>
	);
}

export default Gastronomy;
