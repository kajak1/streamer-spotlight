function Loading(): JSX.Element {
	return (
		<div className="w-full flex flex-row py-1 bg-gray-600 hover:bg-opacity-50 animate-pulse">
			<span className="inline-block relative aspect-square rounded-full h-14 border-2" />
			<div className="flex-1 flex-col pl-4">
				<div className="flex flex-row justify-evenly">
					<span>
						<button></button>
					</span>
					<span></span>
				</div>
			</div>
		</div>
	);
}

export { Loading };
