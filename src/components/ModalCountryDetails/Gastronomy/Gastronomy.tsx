import "./Gastronomy.css";
import "./Slider/Slider.css";
import { useFetchData } from "../DataFetch/DataFetch.tsx";
import Slider from "./Slider/Slider.tsx";

interface DishInterface {
	id: string;
	name: string;
	description: string;
	picture: string;
}

interface FetchDataResult {
	typical_dishes: DishInterface[];
}

interface GastronomyProps {
	country: string;
}

function Gastronomy({ country }: GastronomyProps) {
	const dataGastronomy: FetchDataResult | null = useFetchData(country);

	if (!dataGastronomy) return null;

	return (
		<article className="gastronomy-body">
			<Slider country={country} />
			<div className="dishes">
				{dataGastronomy?.typical_dishes.slice(0, 3).map((dish) => (
					<div key={dish.id} className="dish-card">
						<img
							src={`src/assets/images/${dish.picture}`}
							alt="typical-dish-picture"
							id={`dish-${dish.id}`}
						/>
						<h2>{dish.name}</h2>
						<p>{dish.description}</p>
					</div>
				))}
			</div>
		</article>
	);
}

export default Gastronomy;
