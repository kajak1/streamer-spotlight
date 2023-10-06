// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions-12

import React, { HTMLAttributes } from "react";

interface ClientOnlyProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function ClientOnly({ children, ...delegated }: ClientOnlyProps) {
	const [hasMounted, setHasMounted] = React.useState(false);

	React.useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <>{children}</>;
}
