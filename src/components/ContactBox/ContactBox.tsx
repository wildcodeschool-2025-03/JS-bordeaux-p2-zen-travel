import { useState } from "react";
import "./ContactBox.css";

function ContactBox() {
	const [closeBox, setCloseBox] = useState(false);
	const toggleCloseBox = () => {
		setCloseBox(!closeBox);
	};
	if (closeBox) return null;
	return (
		<div className="contactBox">
			<div className="renseignement">
				<h2>Renseignement contact :</h2>
				<div className="renseignementInfos">
					<p>Voici comment nous contacter !</p>
					<p>Email : exemple@youyou.fr</p>
					<p>Telephone : 08.36.65.65.65</p>
				</div>
			</div>
			<h2>Laisser nous vos coordonnées :</h2>
			<button className="closeBoxe" type="button" onClick={toggleCloseBox}>
				X
			</button>

			<form className="formulaire">
				<label>
					Nom :
					<input type="text" name="name" required />
				</label>
				<label>
					Email :
					<input type="email" name="email" required />
				</label>
				<label>
					Message :
					<textarea name="message" required />
				</label>
				<button className="buttonEnvoyer" type="submit">
					Envoyer le message
				</button>
			</form>
		</div>
	);
}

export default ContactBox;
