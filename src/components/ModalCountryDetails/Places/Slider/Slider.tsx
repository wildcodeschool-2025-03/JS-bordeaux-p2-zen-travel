import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./slider.css";

interface MustSeePlace {
	name: string;
	description: string;
	picture: string;
}

interface CountryProp {
	country: {
		translations: Record<string, { common: string }>;
	};
}

function Slider({ country }: CountryProp) {
	const [myPlaces, setMyPlaces] = useState<MustSeePlace[]>([]);

	useEffect(() => {
		if (!country) return;

		const countryName = country.translations.fra.common;

		fetch(
			"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/db",
		)
			.then((response) => response.json())
			.then((data) => {
				const allCountries = [
					{ name: "Maroc", index: 0 },
					{ name: "France", index: 1 },
					{ name: "États-Unis", index: 2 },
				];
				const selectedCountry = allCountries.find(
					(c) => c.name === countryName,
				);

				if (selectedCountry) {
					const places =
						data.countries[selectedCountry.index]?.must_see_places.slice(
							0,
							3,
						) || [];
					setMyPlaces(places);
				}
			})
			.catch((err) => console.error(err));
	}, [country]);

	if (myPlaces.length === 0) return <p>Chargement...</p>;

	return (
		<div>
			<Carousel
				className="carousel"
				infiniteLoop
				showIndicators={false}
				showStatus={false}
			>
				{myPlaces.map((place) => (
					<div key={place.name}>
						<img
							className="carouselImage"
							src={`src/assets/images/${place.picture}`}
							alt={place.name}
							style={{
								width: "190px",
								height: "160px",
								objectFit: "cover",
							}}
						/>
						<h2>{place.name}</h2>
						<p>{place.description}</p>
					</div>
				))}
			</Carousel>
		</div>
	);
}

export default Slider;
