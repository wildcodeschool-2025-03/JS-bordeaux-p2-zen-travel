import { Link, Outlet } from "react-router";

const InteractiveMap = () => {
	return (
		<div>
			<h1>Sélectionnez votre pays</h1>
			<p>
				Choisissez un pays pour obtenir des informations détaillées et préparer
				votre voyage.
			</p>
			<Link to="modal-info">Voir les infos du pays</Link>
			<Outlet />
		</div>
	);
};

export default InteractiveMap;
