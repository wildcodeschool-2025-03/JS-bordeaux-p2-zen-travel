import Slider from "../../Slider/Slider";
import "./Places.css";
import { useEffect, useState } from "react";

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

function Places({ country }: CountryProp) {
	const [myplaces, setMyPlace] = useState<MustSeePlace[]>([]);

	useEffect(() => {
		const fetchCountries = async () => {
			const res = await fetch(
				"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/db",
			);
			const data = await res.json();

			const countryName = country?.translations.fra.common;

			const allCountries = [
				{ name: "Maroc", index: 0 },
				{ name: "France", index: 1 },
				{ name: "États-Unis", index: 2 },
			];

			const selectedCountry = allCountries.find((c) => c.name === countryName);

			if (selectedCountry) {
				const allPlaces =
					data.countries[selectedCountry.index]?.must_see_places || [];
				setMyPlace(allPlaces.slice(0, 3));
			}
		};
		fetchCountries();
	}, [country]);

	// useEffect(() => {
	// 	fetch(
	// 		"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/countries",
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			const allPlaces = data.flatMap((country) => country.must_see_places);
	// 			const firstThree = allPlaces.slice(0, 3);
	// 			setMyPlace(firstThree);

	// 			console.log(data);
	// 		})
	// 		.catch((err) => console.error(err));
	// }, []);

	return (
		<>
			<ul className="placeList">
				{myplaces?.map((place) => (
					<li key={place.name}>
						<h2>{place.name}</h2>
						<img src={`src/assets/images/${place.picture}`} alt={place.name} />
						<p>{place.description}</p>
					</li>
				))}
			</ul>
			<Slider country={country} />
		</>
	);
}

export default Places;
