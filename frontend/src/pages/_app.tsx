import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { ThemeProvider } from "../context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
	const isAuthenticated = true;
	return (
		<>
			{isAuthenticated ? (
				<ThemeProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			) : (
				<div>not authenticated, login below</div>
			)}
		</>
	);
}
