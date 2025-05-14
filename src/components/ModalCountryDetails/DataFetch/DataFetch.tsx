import { useEffect, useState } from "react";

interface Country {
	translations: Record<string, { common: string }>;
}

export function useFetchData(country: Country) {
	const [dataFetch, setDataFetch] = useState(null);

	useEffect(() => {
		async function fetchCountryData() {
			const response = await fetch(
				"https://my-json-server.typicode.com/wildcodeschool-2025-03/JS-bordeaux-p2-api-zen-travel/db",
			);
			const data = await response.json();

			const countryName = country.translations.fra.common;

			const allCountries = [
				{ name: "Maroc", index: 0 },
				{ name: "France", index: 1 },
				{ name: "États-Unis", index: 2 },
			];
			const selectedCountry = allCountries.find((c) => c.name === countryName);

			if (selectedCountry) {
				setDataFetch(data.countries[selectedCountry.index]);
			}
		}

		fetchCountryData();
	}, [country]);

	return dataFetch;
}
