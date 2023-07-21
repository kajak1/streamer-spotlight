import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { setTheme } from "../scripts/set-theme";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Script
					id="set-theme"
					dangerouslySetInnerHTML={{ __html: `(${String(setTheme)})()` }}
					strategy="beforeInteractive"
				/>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

