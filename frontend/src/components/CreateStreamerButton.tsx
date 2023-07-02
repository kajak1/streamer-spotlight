interface Props {
	onClick: () => void;
}

function CreateStreamerButton({ onClick }: Props): JSX.Element {
	return (
		<button
			onClick={onClick}
			className="w-full py-2 rounded-md border-gray-300 hover:bg-gray-300 bg-gray-200 dark:border-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 dark:text-white border-2"
		>
			Add your streamer!
		</button>
	);
}

export { CreateStreamerButton };
