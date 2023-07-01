import { StreamerCard } from "./StreamerCard";

interface Props {}

function StreamersList(): JSX.Element {
	return (
		<ul>
			<li>
				<StreamerCard />
			</li>
			<li>
				<StreamerCard />
			</li>
			<li>
				<StreamerCard />
			</li>
		</ul>
	);
}

export { StreamersList };
