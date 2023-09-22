import { ReactNode } from "react";

interface Props {
	amount: number;
	onClick: () => void;
	children: ReactNode;
}

export function VoteButton({ amount, children, onClick }: Props): JSX.Element {
	return (
		<span>
			<button className="text-xl pr-2 transition-transform hover:scale-125" onClick={onClick}>
				{children}
			</button>
			<span className="text-xl">{amount ?? "loading"}</span>
		</span>
	);
}
