import $ from "jquery";
import { useEffect, useRef, useState } from "react";
import ModalCountryDetails from "../../components/ModalCountryDetails/ModalCountryDetails";
import "./InteractiveMap.css";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import SearchBar from "../../components/SearchBar/SearchBar";
import ContinentModal from "./ContinentModal/ContinentModal";
import { handleResetZoom, zoomOnContinent } from "./ContinentModal/zoomUtils";

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

window.$ = $;
window.jQuery = $;

function InteractiveMap() {
	const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
	const [continentColors, setContinentColors] = useState({});
	const [resetSearch, setResetSearch] = useState<boolean>(false);
	const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
	const [continentColorsByCountry, setContinentColorsByCountry] = useState({});

	const [isMobile, setIsMobile] = useState(false);
	const [isModaContinentlOpen, setIsModaContinentlOpen] = useState(false);
	const mapRef = useRef(null);

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
			setContinentColorsByCountry(colors);
		};
		fetchContinents();
	}, []);

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkIfMobile();
		window.addEventListener("resize", checkIfMobile);
		return () => window.removeEventListener("resize", checkIfMobile);
	}, []);

	useEffect(() => {
		if (!hoveredCountry) {
			setContinentColors({});
			return;
		}
		setContinentColors({ [hoveredCountry]: "#f39c12" });
	}, [hoveredCountry]);

	const handlecountryClick = (_e: unknown, countryCode: string) => {
		setSelectedCountry(countryCode);
	};

	const handleResetSearch = () => {
		setResetSearch(true);
		setHoveredCountry(null);
		setTimeout(() => setResetSearch(false), 100);
	};

	const handleContinentSelect = (continent: string) => {
		setIsModaContinentlOpen(false);
		zoomOnContinent(continent, mapRef);
	};

	return (
		<section className="interactive-map">
			<SearchBar
				onCountrySelected={setSelectedCountry}
				resetInput={resetSearch}
				onCountryHovered={setHoveredCountry}
			/>

			{isModaContinentlOpen && (
				<ContinentModal
					onClose={() => setIsModaContinentlOpen(false)}
					onSelect={handleContinentSelect}
				/>
			)}

			{selectedCountry && (
				<div className={`modal-info ${selectedCountry ? "blur" : ""}`}>
					<ModalCountryDetails
						countryCode={selectedCountry}
						onClose={() => {
							setSelectedCountry(null);
							handleResetSearch();
						}}
					/>
				</div>
			)}
			<div className="map-wrapper">
				<div className="map-continent-mobile">
					<button
						type="button"
						className="choose-continent-button"
						onClick={() => setIsModaContinentlOpen(true)}
					>
						Choisir un continent
					</button>
					<button
						type="button"
						className="reset-zoom-button"
						onClick={handleResetZoom}
					>
						Réinitialiser le zooom
					</button>
				</div>
				<div className={`vector-map ${isMobile ? "africa" : ""} `}>
					<VectorMap
						ref={mapRef}
						map={worldMill}
						backgroundColor="transparent"
						zoomOnScroll={false}
						onRegionClick={handlecountryClick}
						series={{
							regions: [
								{
									values: { ...continentColorsByCountry, ...continentColors },
									attribute: "fill",
								},
							],
						}}
					/>
				</div>
			</div>
		</section>
	);
}

export default InteractiveMap;
