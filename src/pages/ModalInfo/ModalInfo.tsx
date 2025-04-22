import { Link, Outlet } from "react-router";

const ModalInfo = () => {
	return (
		<div>
			<h1>Voici les informations du pays sélectionné</h1>
			<Link to="/interactive-map">Retour à la carte interactive</Link>
			<Link to="modal-checklist">Ma checklist</Link>
			<Outlet />
		</div>
	);
};

export default ModalInfo;
