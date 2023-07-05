import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

interface ThemeContext {
	colorMode: "dark" | "light" | undefined;
	setColorMode: (mode: ThemeContext["colorMode"] & {}) => void;
}

const ThemeContext = createContext<ThemeContext>({
	colorMode: undefined,
	setColorMode: (mode: ThemeContext["colorMode"] & {}) => {
		// nothing now
	},
});

interface Props {
	children: ReactNode;
}

export function ThemeProvider({ children }: Props): JSX.Element {
	const [colorMode, rawSetColorMode] =
		useState<ThemeContext["colorMode"]>(undefined);

	useEffect(() => {
		const html = document.querySelector("html");

		const isDarkModeSet = html?.classList.contains("dark");

		rawSetColorMode(isDarkModeSet ? "dark" : "light");
	}, []);

	const setColorMode = useCallback(
		(mode: NonNullable<ThemeContext["colorMode"]>) => {
			rawSetColorMode(mode);

			const html = document.querySelector("html");
			html?.classList.toggle("dark");

			localStorage.setItem("color-mode", mode);
		},
		[]
	);

	const contextValue = useMemo(() => {
		return {
			colorMode,
			setColorMode,
		};
	}, [colorMode, setColorMode]);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
