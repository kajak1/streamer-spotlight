import { ThemeSwitch } from "@/ThemeSwitch";

interface Props {}

function Header(): JSX.Element {
	return (
		<header className="w-full flex justify-between items-center py-3 px-3">
			<h1 className="text-xl lg:text-3xl">Streamer Spotlight</h1>
			<ThemeSwitch />
		</header>
	);
}

export { Header };
