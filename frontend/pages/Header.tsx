import { ThemeSwitch } from "@/pages/components/ThemeSwitch";
import Link from "next/link";

interface Props {}

function Header(): JSX.Element {
	return (
		<header className="w-full flex justify-between items-center py-3 px-3">
			<h1 className="text-2xl w-2/6 md:w-auto lg:text-3xl">
				Streamer Spotlight
			</h1>
			<nav className="flex-1 pl-4">
				<Link href="/">Streamers</Link>
			</nav>
			<ThemeSwitch />
		</header>
	);
}

export { Header };
