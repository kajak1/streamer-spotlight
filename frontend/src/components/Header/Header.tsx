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

  return <AuthenticatedHeader user={user} />;
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
    <header className="flex w-full items-baseline justify-between gap-2 px-3 pb-5 pt-3 text-black dark:text-gray-200">
      <span className="flex flex-shrink-0 flex-col">
        <h1 className="text-2xl lg:w-auto lg:text-3xl">Streamer Spotlight</h1>
        <i>hello {user?.username}!</i>
      </span>
      <nav className="flex flex-1 justify-between md:pl-8">
        <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-500">
          All streamers
        </Link>
        <Link
          href="/uploaded"
          className="hover:text-blue-500 dark:hover:text-blue-500"
        >
          Uploaded
        </Link>
        <Link
          href="/login"
          className="hover:text-blue-500 dark:hover:text-blue-500"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </nav>
      <ThemeSwitch />
    </header>
  );
}

export function UnauthenticatedHeader() {
  return (
    <header className="flex w-full items-baseline justify-between px-3 pb-5 pt-3 text-black dark:text-gray-200">
      <h1 className="w-2/6 text-2xl lg:w-auto lg:text-3xl">
        Streamer Spotlight
      </h1>
      <ThemeSwitch />
    </header>
  );
}
