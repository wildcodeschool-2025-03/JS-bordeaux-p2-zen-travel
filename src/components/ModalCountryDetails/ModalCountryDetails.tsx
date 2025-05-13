import "./ModalCountryDetails.css";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Climat from "./Climat/Climat";
import Gastronomy from "./Gastronomy/Gastronomy";
import Places from "./Places/Places";
import Tips from "./Tips/Tips";

interface ModalCountryDetailsProps {
	countryCode: string;
	onClose: () => void;
}

interface CountryInterface {
	flags: Record<string, string>;
	translations: Record<string, { common: string }>;
	capital: string;
	region: string;
	population: string;
	languages: string;
}

function ModalCountryDetails({
	countryCode,
	onClose,
}: ModalCountryDetailsProps) {
	const [country, setCountry] = useState<CountryInterface | null>(null);
	const [activTab, setActivTab] = useState("Infos");
	const [isMobile, setIsMobile] = useState(false);
	const [showContent, setShowContent] = useState(false);

	const tabs = ["Infos", "Gastronomie", "Climat", "Tips", "Places"];

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	useEffect(() => {
		fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
			.then((response) => response.json())
			.then((data) => setCountry(data[0]))
			.catch((err) => console.error(err));
	}, [countryCode]);

	return (
		<section className={`info ${isMobile ? "mobile-view" : ""}`}>
			<div className="modal-header">
				<button type="button" className="close-button" onClick={onClose}>
					x
				</button>
			</div>

			{isMobile && !showContent && country && (
				<div className="choose-msg">
					<img
						src={country.flags.png}
						alt=""
						className="flagCountries"
						width="150"
					/>
					<h3>{country.translations.fra.common} </h3>
					<p className="choose-tab">Choisir votre onglet</p>
					<div className="tab-mobile">
						<button
							type="button"
							className="btn-mobile"
							onClick={() => {
								setActivTab("Infos");
								setShowContent(true);
							}}
						>
							<span className="weather">📝</span> Infos
						</button>
						<button
							type="button"
							className="btn-mobile"
							onClick={() => {
								setActivTab("Gastronomie");
								setShowContent(true);
							}}
						>
							<span className="weather">🍽️</span> Gastronomie
						</button>
						<button
							type="button"
							className="btn-mobile"
							onClick={() => {
								setActivTab("Climat");
								setShowContent(true);
							}}
						>
							<span className="weather">🌦️</span> Climat
						</button>
						<button
							type="button"
							className="btn-mobile"
							onClick={() => {
								setActivTab("Tips");
								setShowContent(true);
							}}
						>
							<span className="weather">💡</span> Tips
						</button>
						<button
							type="button"
							className="btn-mobile grid"
							onClick={() => {
								setActivTab("Places");
								setShowContent(true);
							}}
						>
							<span className="weather">📍</span> Places
						</button>
					</div>
				</div>
			)}

			{(showContent || !isMobile) && country && (
				<div>
					{isMobile && showContent && (
						<button
							type="button"
							className="back-button-mobile"
							onClick={() => setShowContent(false)}
						>
							<IoArrowBack />
						</button>
					)}
					<img
						className="flag-countries"
						src={country.flags.png}
						alt="countryFlag"
					/>

					<div className="tabs">
						{tabs.map((tab) => (
							<button
								key={tab}
								type="button"
								className={`tab-btn ${tab === activTab ? "active" : ""}`}
								onClick={() => setActivTab(tab)}
							>
								{" "}
								{tab}
							</button>
						))}
					</div>

					{activTab === "Infos" && (
						<div className="modal-content">
							<h2>{country.translations.fra.common}</h2>
							<p>Capital: {country.capital?.[0]}</p>
							<p>Region: {country.region}</p>
							<p>Population: {country.population.toLocaleString()}</p>
							<p>
								Langue :
								{country.languages &&
									Object.values(country.languages).join(" , ")}
							</p>
						</div>
					)}

					{activTab === "Gastronomie" && <Gastronomy />}

					{activTab === "Climat" && <Climat country={country} />}

					{activTab === "Tips" && <Tips />}

					{activTab === "Lieux à visiter" && <Places />}
				</div>
			)}

			<section className="pack-your-bag">
				<button type="button">Pack ta valise</button>
			</section>
		</section>
	);
}

export default ModalCountryDetails;
