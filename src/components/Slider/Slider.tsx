import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Slider.css";
import { useEffect, useState } from "react";

function Slider() {
	const [countriesInfo, setCountriesInfo] = useState([]);

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
		<Carousel className="dishes" autoPlay interval={5000} infiniteLoop>
			{country.typical_dishes.slice(0, 3).map((dish) => (
				<div key={dish.id} className="dish-card-slider">
					<img
						src={`src/img/${dish.picture}`}
						alt="typical-dish-picture"
						id={`dish-${dish.id}`}
					/>
					<h2>{dish.name}</h2>
					<p>{dish.description}</p>
				</div>
			))}
		</Carousel>
	);
}

export default Slider;
