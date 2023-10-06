import { useUser } from "@/src/hooks/use-user";
import { authService } from "@/src/services/auth.service";
import { User } from "@/src/services/users.service";
import { SWR_KEYS } from "@/src/swr-keys";
import Link from "next/link";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { ClientOnly } from "../ClientOnly";
import { ThemeSwitch } from "../ThemeSwitch";

export function Header() {
	const { user, loggedOut } = useUser();

	if (loggedOut || !user) {
		return <UnauthenticatedHeader />;
	}

	return (
		<ClientOnly>
			<AuthenticatedHeader user={user} />
		</ClientOnly>
	);
}

interface AuthenticatedHeaderProps {
	user: User;
}

export function AuthenticatedHeader({ user }: AuthenticatedHeaderProps) {
	async function handleLogout() {
		try {
			await authService.logout();
			await mutate(SWR_KEYS.USER);
		} catch (e) {
			toast.error("Failed to logout");
		}
	}

	return (
		<header className="w-full flex gap-2 justify-between items-baseline pt-3 pb-5 px-3 dark:text-gray-200 text-black">
			<span className="flex flex-col flex-shrink-0">
				<h1 className="text-2xl lg:w-auto lg:text-3xl">Streamer Spotlight</h1>
				<i>hello {user?.username}!</i>
			</span>
			<nav className="md:pl-8 flex-1 flex justify-between">
				<Link href="/" className="hover:text-blue-500 dark:hover:text-blue-500">
					All streamers
				</Link>
				<Link href="/login" onClick={handleLogout}>
					Logout
				</Link>
			</nav>
			<ThemeSwitch />
		</header>
	);
}

export function UnauthenticatedHeader() {
	return (
		<header className="w-full flex justify-between items-baseline pt-3 pb-5 px-3 dark:text-gray-200 text-black">
			<h1 className="text-2xl w-2/6 lg:w-auto lg:text-3xl">Streamer Spotlight</h1>
			<nav className="pl-4 md:pl-8 flex-1">
				<Link href="/" className="hover:text-blue-500 dark:hover:text-blue-500">
					All streamers
				</Link>
			</nav>
			<ThemeSwitch />
		</header>
	);
}
