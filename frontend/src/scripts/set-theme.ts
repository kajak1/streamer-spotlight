export function setTheme() {
	const persistedColorPreference = localStorage.getItem("color-mode");
	const hasPersistedPreference = typeof persistedColorPreference === "string";
	const isPreferenceValid =
		persistedColorPreference === "dark" || persistedColorPreference === "light";

	if (hasPersistedPreference && isPreferenceValid) {
		const html = document.querySelector("html");
		if (persistedColorPreference === "dark") {
			html?.classList.add("dark");
		}

		return;
	}

	const mql = matchMedia("(prefers-color-scheme: dark)");
	const hasMediaQueryPreference = typeof mql.matches === "boolean";

	if (hasMediaQueryPreference) {
		const html = document.querySelector("html");
		if (mql.matches) html?.classList.toggle("dark");
		return;
	}
}
