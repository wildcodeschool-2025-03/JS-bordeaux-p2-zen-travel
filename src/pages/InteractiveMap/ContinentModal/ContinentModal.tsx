import { continentToCountries } from "./continentToCountries";
import "./ContinentModal.css";

interface ContinentModalProps {
	onClose: () => void;
	onSelect: (continent: string) => void;
}

const ContinentModal = ({ onSelect, onClose }: ContinentModalProps) => {
	return (
		<div className="continent-modal">
			<div className="continent-modal-content">
				<button
					type="button"
					className="close-modal-continent"
					onClick={onClose}
				>
					×
				</button>
				<h3>Sélectionner un continent</h3>

				<div className="continent-list">
					{Object.keys(continentToCountries).map((continent) => (
						<button
							type="button"
							key={continent}
							className="continent-region"
							onClick={() => onSelect(continent)}
						>
							{continent}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default ContinentModal;
