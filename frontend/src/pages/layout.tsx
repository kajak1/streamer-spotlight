import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<main className="flex flex-col text-gray-800 bg-slate-100 dark:bg-gray-900 dark:text-gray-200 items-center min-h-screen px-2 sm:px-36 md:px-48 lg:px-64 xl:px-96">
				<Header />
				{children}
			</main>
			<Toaster />
		</>
	);
}
