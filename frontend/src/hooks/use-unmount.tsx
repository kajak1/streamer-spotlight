import { useEffect } from "react";

export function useUnmount(log: string) {
	useEffect(() => {
		return () => {
			console.log(log);
		};
	}, [log]);
}
