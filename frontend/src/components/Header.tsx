import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";

function Header(): JSX.Element {
	return (
		<header className="w-full flex justify-between items-center pt-3 pb-5 px-3 dark:text-gray-200 text-black">
			<h1 className="text-2xl w-2/6 md:w-auto lg:text-3xl">
				Streamer Spotlight
			</h1>
			<nav className="flex-1 pl-4 md:pl-8 hover:text-blue-700">
				<Link href="/">All streamers</Link>
			</nav>
			{/* <ThemeSwitch /> */}
		</header>
	);
}

export { Header };
