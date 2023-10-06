import { ReactNode, useEffect } from "react";
import { useUser } from "../../hooks/use-user";
import Router from "next/router";

export function RedirectController({ children }: { children: ReactNode }) {
	const { loggedOut } = useUser();

	useEffect(() => {
		console.log(`RedirectController running loggedOut: ${loggedOut}`);
		if (loggedOut) {
			Router.replace("/login");
		} else {
			Router.replace("/");
		}
	}, [loggedOut]);

	return children;
}
