import ModalCountryDetails from "../../components/ModalCountryDetails/ModalCountryDetails";
import "./InteractiveMap.css";

function InteractiveMap() {
	return (
		<section>
			<h1>Sélectionnez votre pays</h1>
			<p>
				Choisissez un pays pour obtenir des informations détaillées et préparer
				votre voyage.
			</p>
			<ModalCountryDetails />
		</section>
	);
}

export default InteractiveMap;
