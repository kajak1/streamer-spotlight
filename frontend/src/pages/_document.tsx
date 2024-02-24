import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { setTheme } from "../scripts/set-theme";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* <body className="bg-sl-200 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200"> */}
      <body className="bg-slate-200 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
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
