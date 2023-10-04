import { ReactNode, useEffect } from "react";
import { useUser } from "../../hooks/use-user";
import Router from "next/router";

export function RedirectController({ children }: { children: ReactNode }) {
	const { loggedOut } = useUser();

	useEffect(() => {
		if (loggedOut) {
			Router.replace("/login");
		} else {
			Router.replace("/");
		}
	}, [loggedOut]);

	return children;
}
