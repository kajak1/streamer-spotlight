import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export function StreamerList({ children }: Props): JSX.Element {
	return (
		<section className="w-full py-6">
			<h2 className="text-xl pb-4 dark:text-white">Streamers:</h2>
			{children}
		</section>
	);
}
