import Slider from "../../Slider/Slider";
import "./Places.css";
import { useEffect, useState } from "react";

interface MustSeePlace {
	name: string;
	description: string;
	picture: string;
}
interface Country {
	country: string;
	must_see_places: MustSeePlace[];
}

function Places() {
	const [myplaces, setMyPlace] = useState<MustSeePlace[]>([]);

	useEffect(() => {
		fetch(
			"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/countries",
		)
			.then((response) => response.json())
			.then((data: Country[]) => {
				const allPlaces = data.flatMap((country) => country.must_see_places);
				const firstThree = allPlaces.slice(0, 3);
				setMyPlace(firstThree);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<ul className="placeList">
				{myplaces.map((place) => (
					<li key={place.name}>
						<h2>{place.name}</h2>
						<img
							src={`src/assets/images/${place.picture}`}
							alt={place.name}
							style={{
								width: "170px",
								height: "150px",
								objectFit: "cover",
							}}
						/>
						<p>{place.description}</p>
					</li>
				))}
			</ul>
			<Slider />
		</>
	);
}

export default Places;
