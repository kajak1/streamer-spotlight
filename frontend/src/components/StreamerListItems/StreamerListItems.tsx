import { useStreamerList } from "../StreamerList/use-streamers-list";
import { StreamerListItem } from "../StreamerListItem";

export function StreamerListItems(): JSX.Element {
	const { streamers, error, isLoading, isValidating } = useStreamerList();

	if (isLoading) return <div>Loading</div>;

	return (
		<>
			<div>{isValidating && "refetching..."}</div>
			{Boolean(error) && <p className="text-red-600 text-center">{error.message}</p>}
			<ul className="flex flex-col-reverse">
				{streamers?.length ? (
					streamers.map((streamer) => {
						return <StreamerListItem key={streamer.id} id={streamer.id} name={streamer.name} />;
					})
				) : (
					<div className="w-full text-md text-center">Nothing is added yet</div>
				)}
			</ul>
		</>
	);
}
