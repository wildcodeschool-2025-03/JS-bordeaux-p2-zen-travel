import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useFetchData } from "../../DataFetch/DataFetch.tsx";
import "./SliderGastronomy.css";

interface DishInterface {
	id: string;
	name: string;
	description: string;
	picture: string;
}

interface FetchDataResult {
	typical_dishes: DishInterface[];
}

interface SliderProps {
	country: string;
}

function Slider({ country }: SliderProps) {
	const dataGastronomy: FetchDataResult | null = useFetchData(country);

	if (!dataGastronomy) return null;

	return (
		<div className="dishes">
			<Carousel
				className="carousel-dishes"
				autoPlay
				interval={5000}
				infiniteLoop
			>
				{dataGastronomy.typical_dishes.slice(0, 3).map((dish) => (
					<div key={dish.id} className="dish-card-slider">
						<img
							src={`src/assets/images/${dish.picture}`}
							alt="typical-dish-picture"
							id={`dish-${dish.id}`}
						/>
						<h2>{dish.name}</h2>
						<p>{dish.description}</p>
					</div>
				))}
			</Carousel>
		</div>
	);
}

export default Slider;
