import { useEffect, useState } from "react";
import ModalCountryDetails from "../../components/ModalCountryDetails/ModalCountryDetails";
import "./InteractiveMap.css";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

interface CountryRegionDetails {
	cca2: string;
	region: string;
}

interface Accumulator {
	[key: string]: string;
}

const continentColorMap: Record<string, string> = {
	Africa: "#045a1a",
	Americas: "#1a6476",
	Asia: "#755b05",
	Europe: "#5a3305",
	Oceania: "#2a2a2d",
};

function InteractiveMap() {
	const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
	const [continentColors, setContinentColors] = useState({});

	useEffect(() => {
		const fetchContinents = async () => {
			const response = await fetch(
				"https://restcountries.com/v3.1/all?fields=cca2,region",
			);
			const data = await response.json();

			const colors = data.reduce(
				(acc: Accumulator, country: CountryRegionDetails) => {
					const color = continentColorMap[country.region];
					if (color) {
						acc[country.cca2] = color;
					}
					return acc;
				},
				{},
			);
			setContinentColors(colors);
		};
		fetchContinents();
	}, []);

	const handlecountryClick = (_e: unknown, countryCode: string) => {
		setSelectedCountry(countryCode);
	};
	return (
		<section>
			{selectedCountry && (
				<div className="modal-info">
					<ModalCountryDetails
						countryCode={selectedCountry}
						onClose={() => {
							setSelectedCountry(null);
						}}
					/>
				</div>
			)}

			<div className="vector-map">
				<VectorMap
					map={worldMill}
					backgroundColor="transparent"
					zoomOnScroll={false}
					onRegionClick={handlecountryClick}
					series={{
						regions: [
							{
								values: { ...continentColors },
								attribute: "fill",
							},
						],
					}}
				/>
			</div>
		</section>
	);
}

export default InteractiveMap;
