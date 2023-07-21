import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { useTheme } from "../context/ThemeContext";

function ThemeSwitch(): JSX.Element {
	const { colorMode, setColorMode } = useTheme();

	if (!colorMode) {
		return <>{null}</>;
	}

	const icon =
		colorMode === "dark" ? (
			<FontAwesomeIcon icon={faMoon} className="text-gray-300 text-xl" />
		) : (
			<FontAwesomeIcon icon={faSun} className="text-orange-300 text-xl" />
		);

	return (
		<button
			className="aspect-square h-12 rounded-xl border-2 text-center border-gray-400"
			onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
		>
			{icon}
		</button>
	);
}

export { ThemeSwitch };
