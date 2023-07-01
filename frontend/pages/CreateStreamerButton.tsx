interface Props {
	onClick: () => void;
}

function CreateStreamerButton({ onClick }: Props): JSX.Element {
	return (
		<button
			onClick={onClick}
			className="w-full py-2 rounded-md border-blue-500 border-2"
		>
			Add your streamer!
		</button>
	);
}

export { CreateStreamerButton };
