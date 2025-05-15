import { useEffect, useState } from "react";

interface Dish {
	id: string;
	name: string;
	description: string;
	picture: string;
}

interface CountryData {
	typical_dishes: Dish[];
}

interface Country {
	translations: {
		fra: {
			common: string;
		};
	};
}

export function useFetchData(country: Country): CountryData | null {
	const [data, setData] = useState<CountryData | null>(null);

	useEffect(() => {
		const countryName = country.translations.fra.common;

		fetch(
			"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/db",
		)
			.then((res) => res.json())
			.then((responseData) => {
				const allCountries = ["Maroc", "France", "États-Unis"];
				const index = allCountries.indexOf(countryName);
				if (index !== -1) {
					setData(responseData.countries[index]);
				}
			})
			.catch((error) => console.error(error));
	}, [country]);

	return data;
}
