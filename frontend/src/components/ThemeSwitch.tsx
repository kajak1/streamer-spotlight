import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";

function ThemeSwitch(): JSX.Element {
	return (
		<button className="aspect-square h-12 rounded-xl border-2 text-center">
			<FontAwesomeIcon
				// onClick={}
				icon={faSun}
				className="text-orange-200 text-xl"
			/>
		</button>
	);
}

export { ThemeSwitch };
