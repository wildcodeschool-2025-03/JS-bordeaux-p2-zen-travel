import { useEffect, useState } from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { useTypewriter } from "react-simple-typewriter";

interface SearchBarProps {
	onCountrySelected: (code: string) => void;
	resetInput: boolean;
	onCountryHovered: (code: string | null) => void;
}

interface Country {
	name: string;
	flag: string;
	code: string;
}

function SearchBar({
	onCountrySelected,
	resetInput,
	onCountryHovered,
}: SearchBarProps) {
	const [allCountries, setAllCountries] = useState<Country[]>([]);
	const [searchCountry, setSearchCountry] = useState<string>("");
	const [suggestions, setSuggestions] = useState<boolean>(true);
	const [autoCompletion, setAutoCompletion] = useState("");
	const [hoverCodeCountry, setHoverCodeCountry] = useState<string | null>(null);

	const [isSearchMobile, setIsSearchMobile] = useState(false);
	const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

	useEffect(() => {
		async function fetchCountries() {
			const response = await fetch("https://restcountries.com/v3.1/all");
			const data = await response.json();

			const countryDetails: Country[] = data.map((item) => ({
				name: item.translations.fra.common,
				flag: item.flags.svg,
				code: item.cca2,
			}));
			setAllCountries(countryDetails);
		}
		fetchCountries();
	}, []);

	useEffect(() => {
		if (resetInput) setSearchCountry("");
	}, [resetInput]);

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth > 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const [text] = useTypewriter({
		words: ["✈️ Où veux-tu aller ?"],
		loop: 0,
		typeSpeed: 100,
		deleteSpeed: 0,
	});

	const filterCountries = (value: string) => {
		return allCountries.filter((country) =>
			country.name.toLowerCase().startsWith(value.toLowerCase()),
		);
	};
	const filtredCountries = filterCountries(searchCountry);

	const handleAutoCompletion = (value: string) => {
		if (value === "") {
			setAutoCompletion("");
			setSuggestions(false);
			onCountryHovered(null);
			return;
		}
		const match = filterCountries(value)[0];

		setAutoCompletion(match ? value + match.name.slice(value.length) : "");
		setSuggestions(true);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchCountry(value);
		handleAutoCompletion(value);
	};

	const handleCountrySelected = (country: Country) => {
		setSearchCountry(country.name);
		onCountrySelected(country.code);
		setSuggestions(false);
		setAutoCompletion("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Tab") {
			e.preventDefault();

			const match = hoverCodeCountry
				? allCountries.find((country) => country.code === hoverCodeCountry)
				: "";
			if (match) {
				handleCountrySelected(match);
			}
		}
	};

	const handleMouseEnter = (country: Country) => {
		setHoverCodeCountry(country.code);
		onCountryHovered(country.code);

		const match = country.name
			.toLowerCase()
			.startsWith(searchCountry.toLowerCase())
			? country.name
			: "";
		setAutoCompletion(match.charAt(0).toLowerCase() + match.slice(1));
	};

	return (
		<>
			<button
				type="button"
				className="search-icon"
				onClick={() => {
					setIsSearchMobile((prev) => !prev);
					setSuggestions(false);
				}}
			>
				<FiSearch />
			</button>

			<div className={`input-wrapper ${isSearchMobile ? "show" : ""}`}>
				{(isSearchMobile || isDesktop) && (
					<div className="autocomplete-container">
						<span className="autocomplete-text">
							<span className="filled-text">{searchCountry} </span>
							<span className="suggested-text">
								{autoCompletion.slice(searchCountry.length)}
							</span>
						</span>
						<input
							type="text"
							className="search-input"
							value={searchCountry}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							placeholder={text}
						/>
					</div>
				)}

				{searchCountry && suggestions && filtredCountries.length > 0 && (
					<ul className="suggestions">
						{filtredCountries.map((country) => (
							<li
								key={country.name}
								className="suggestions-items"
								onClick={() => handleCountrySelected(country)}
								onMouseEnter={() => handleMouseEnter(country)}
								onKeyDown={handleKeyDown}
							>
								<img src={country.flag} alt={country.name} className="flag" />
								{country.name}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
}

export default SearchBar;
