import "./ModalCountryDetails.css";
import { useEffect, useState } from "react";
import Climat from "./Climat/Climat";
import Gastronomy from "./Gastronomy/Gastronomy";
import Places from "./Places/Places";
import Tips from "./Tips/Tips";

interface CountryInterface {
	flags: Record<string, string>;
	translations: Record<string, { common: string }>;
	capital: string;
	region: string;
	population: string;
	languages: string;
}

function ModalCountryDetails() {
	const [country, setCountry] = useState<CountryInterface | null>(null);
	const [activTab, setActivTab] = useState("Infos");

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((response) => response.json())
			.then((data) => setCountry(data[56]))
			.catch((err) => console.error(err));
	}, []);

	return (
		<section className="info">
			<div>
				{country ? (
					<div>
						<img
							className="flag-countries"
							src={country.flags.png}
							alt="countryFlag"
						/>

						<button type="button" className="close-button">
							X
						</button>

						<nav className="navbar">
							<button type="button" onClick={() => setActivTab("Infos")}>
								Infos
							</button>
							<button type="button" onClick={() => setActivTab("Gastronomie")}>
								Gastronomie
							</button>
							<button type="button" onClick={() => setActivTab("Climat")}>
								Climat
							</button>
							<button type="button" onClick={() => setActivTab("Tips")}>
								Tips
							</button>
							<button
								type="button"
								onClick={() => setActivTab("Lieux à visiter")}
							>
								Lieux à visiter
							</button>
						</nav>

						<div className="modal-content">
							{activTab === "Infos" && (
								<>
									<h2>{country.translations.fra.common}</h2>
									<p>Capital: {country.capital?.[0]}</p>
									<p>Region: {country.region}</p>
									<p>Population: {country.population.toLocaleString()}</p>
									<p>
										Langue :
										{country.languages &&
											Object.values(country.languages).join(" , ")}
									</p>
								</>
							)}

							{activTab === "Gastronomie" && <Gastronomy />}

							{activTab === "Climat" && <Climat />}

							{activTab === "Tips" && <Tips />}

							{activTab === "Lieux à visiter" && <Places />}
						</div>
					</div>
				) : (
					<p>Désolé, le pays sélectionné n'est pas dans la liste !</p>
				)}
			</div>

			<section className="pack-your-bag">
				<button type="button">Pack ta valise</button>
			</section>
		</section>
	);
}

export default ModalCountryDetails;
