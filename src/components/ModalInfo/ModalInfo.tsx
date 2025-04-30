import "./ModalInfo.css";
import { useEffect, useState } from "react";
import ModalClimat from "../ModalClimat/ModalClimat";
import ModalGastronomie from "../ModalGastronomie/ModalGastronomie";
import ModalPlaces from "../ModalPlaces/ModalPlaces";
import ModalTips from "../ModalTips/ModalTips";

interface ModalInfoProps {
	flags: Record<string, string>;
	translations: Record<string, { common: string }>;
	capital: string;
	region: string;
	population: string;
	languages: string;
}

function ModalInfo() {
	const [country, setCountry] = useState<ModalInfoProps | null>(null);
	const [activTab, setActivTab] = useState("Infos");

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((response) => response.json())
			.then((data) => setCountry(data[56]))
			.catch((err) => console.error(err));
	}, []);

	return (
		<section className="ModalInfo">
			<div>
				{country ? (
					<div>
						<img
							className="flagCountries"
							src={country.flags.png}
							alt="countryFlag"
							width="150"
						/>

						<button type="button" className="close-button">
							X
						</button>

						<nav className="navbar">
							<button type="button" onClick={() => setActivTab("Infos")}>
								<strong>Infos</strong>
							</button>
							<button type="button" onClick={() => setActivTab("Gastronomie")}>
								<strong>Gastronomie</strong>
							</button>
							<button type="button" onClick={() => setActivTab("Climat")}>
								<strong>Climat</strong>
							</button>
							<button type="button" onClick={() => setActivTab("Tips")}>
								<strong>Tips</strong>
							</button>
							<button
								type="button"
								onClick={() => setActivTab("Lieux à visiter")}
							>
								<strong>Lieux à visiter</strong>
							</button>
						</nav>

						<div className="modal-content">
							{activTab === "Infos" && (
								<>
									<h2>{country.translations.fra.common}</h2>
									<p>
										<strong>Capital:</strong> {country.capital?.[0]}
									</p>
									<p>
										<strong>Region:</strong> {country.region}
									</p>
									<p>
										<strong>Population:</strong>{" "}
										{country.population.toLocaleString()}
									</p>
									<p>
										<strong>Langue : </strong>
										{country.languages &&
											Object.values(country.languages).join(" , ")}
									</p>
								</>
							)}

							{activTab === "Gastronomie" && <ModalGastronomie />}

							{activTab === "Climat" && <ModalClimat />}

							{activTab === "Tips" && <ModalTips />}

							{activTab === "Lieux à visiter" && <ModalPlaces />}
						</div>
					</div>
				) : (
					<p>Désolé, le pays sélectionné n'est pas dans la liste !</p>
				)}
			</div>

			<section className="PackTaValise">
				<button type="button">Pack ta valise</button>
			</section>
		</section>
	);
}

export default ModalInfo;
