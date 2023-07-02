import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<Layout>
			<Component {...pageProps} key={router.route} />
		</Layout>
	);
}

