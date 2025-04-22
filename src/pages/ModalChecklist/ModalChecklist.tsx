import { Link } from "react-router";

const ModalChecklist = () => {
	return (
		<div>
			<h1>Pack ta valise</h1>
			<p>Voici une checklist basique pour ton voyage.</p>
			<Link to="/interactive-map/modal-info" className="text-blue-500">
				Retour aux infos du pays
			</Link>
		</div>
	);
};

export default ModalChecklist;
