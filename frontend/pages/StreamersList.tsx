import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

function StreamersList({ children }: Props): JSX.Element {
	return (
		<article className="w-full py-8">
			<h2 className="text-xl pb-4">Streamers:</h2>
			<ul>{children}</ul>
		</article>
	);
}

export { StreamersList };
