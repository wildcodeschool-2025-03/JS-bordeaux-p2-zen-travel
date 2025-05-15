import Slider from "./Slider/Slider";
import "./Places.css";
import { useEffect, useState } from "react";

interface MustSeePlace {
	name: string;
	description: string;
	picture: string;
}

interface CountryProp {
	translations: Record<string, { common: string }>;
}

function Places({ country }: { country: CountryProp }) {
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

	return (
		<>
			<ul className="placeList">
				{myplaces?.map((place) => (
					<li key={place.name} className="places-card">
						<h2 className="place-title">{place.name}</h2>
						<img src={`src/assets/images/${place.picture}`} alt={place.name} />
						<p className="place-description">{place.description}</p>
					</li>
				))}
				<Slider country={country} />
			</ul>
		</>
	);
}

export default Places;
