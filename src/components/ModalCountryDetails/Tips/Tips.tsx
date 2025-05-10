import { useEffect, useState } from "react";
import "./Tips.css";

function Tips({ country }) {
	const [dataTips, setDataTips] = useState(null);
	const [currentTips, setCurrentTips] = useState(0);

	useEffect(() => {
		async function fetchDataTips() {
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
				setDataTips(data.countries[selectedCountry.index]);
			} else {
				const language = countryName ? countryName : "Langue locale";

				setDataTips({
					best_time_to_visit: {
						tips: [
							"🧳 Vérifiez votre CheckList de voyage pour ne rien oublier",
							`🗣️ Pensez à apprendre quelques mots en ${language}`,
						],
					},
					visa: "Vérifier les exigences de visa",
					currency: country.currencies
						? Object.values(country.currencies)
								.map((c) => c.name)
								.join(" , ")
						: "Devise locale",
					vaccines: "Vaccins recommandé",
					plug: "Adaptateur universel recommandé",
					language: language,
					emergency: { police: "Consultez les numéros locaux" },
				});
			}
		}
		fetchDataTips();
	}, [country]);

	return (
		<section className="tips">
			{dataTips?.best_time_to_visit?.tips ? (
				<div className="tips-details">
					<div className="tip-card">
						<h2>💡 Conseil #{currentTips + 1} </h2>
						<p className="tip-description">
							{dataTips.best_time_to_visit.tips[currentTips]}
						</p>
						<div className="carousel-controls">
							<button
								type="button"
								className="btn-conseils"
								onClick={() => {
									currentTips > 0 && setCurrentTips(currentTips - 1);
								}}
							>
								⬅ Précedent
							</button>
							<button
								type="button"
								className="btn-conseils"
								onClick={() => {
									currentTips < dataTips.best_time_to_visit.tips.length - 1 &&
										setCurrentTips(currentTips + 1);
								}}
							>
								{" "}
								Suivant ➡️
							</button>
						</div>
						<div className="additional-info">
							<p>Infos supplémentaires</p>
							<ul>
								{dataTips.best_time_to_visit.spring && (
									<>
										<li>
											🌸 Meilleure période (printemps)
											<span>{dataTips.best_time_to_visit.spring} </span>
										</li>
										<li>
											🍂 Meilleure période (Automne)
											<span>{dataTips.best_time_to_visit.autumn} </span>
										</li>
									</>
								)}
								{dataTips.best_time_to_visit.saisons && (
									<li>
										📅 Meilleure période{" "}
										<span>{dataTips.best_time_to_visit.saisons}</span>
									</li>
								)}
								<li>
									🪪 Visa: <span className="visa">{dataTips.visa} </span>
								</li>
								<li>
									💰 Devise: <span>{dataTips.currency} </span>
								</li>
								<li>
									💉 Vaccins: <span> {dataTips.vaccines}</span>
								</li>
								<li>
									🔌 Adaptateurs: <span>{dataTips.plug} </span>
								</li>
								<li>
									🗣️ Langue locale: <span>{dataTips.language} </span>
								</li>
								<li>
									🚨 Les urgences:
									<div className="emergency-row">
										<span>👮 {dataTips.emergency?.police}</span> |{" "}
										<span>🚑 {dataTips.emergency?.ambulance}</span> |{" "}
										<span>🚒 {dataTips.emergency?.pompiers}</span>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			) : (
				<p>Pas de données</p>
			)}
		</section>
	);
}

export default Tips;
