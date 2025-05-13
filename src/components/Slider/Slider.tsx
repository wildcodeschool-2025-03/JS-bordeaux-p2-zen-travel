import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./slider.css";

interface MustSeePlace {
	name: string;
	description: string;
	picture: string;
}

interface Country {
	country: string;
	must_see_places: MustSeePlace[];
}

function Slider() {
	const [myPlaces, setMyPlaces] = useState<MustSeePlace[]>([]);

	useEffect(() => {
		fetch(
			"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/countries",
		)
			.then((response) => response.json())
			.then((data) => {
				const firstCountryPlaces = data[0]?.must_see_places.slice(0, 3) || [];
				setMyPlaces(firstCountryPlaces);
			})
			.catch((err) => console.error(err));
	}, []);

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
							// style={{
							// 	width: "190px",
							// 	height: "160px",
							// 	objectFit: "cover",
							// }}
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
