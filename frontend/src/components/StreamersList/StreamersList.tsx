import { StreamerCard } from "../StreamerCard";
import { useStreamersList } from "./use-streamers-list";

export function StreamersList(): JSX.Element {
	const { streamers, error } = useStreamersList();

	// if (typeof streamers === "undefined") return <div>Failed to load</div>;

	const areStreamersEmpty = typeof streamers === "undefined" || streamers.length === 0;

	return (
		<section className="w-full py-6">
			<h2 className="text-xl pb-4 dark:text-white">Streamers:</h2>
			{Boolean(error) && <p className="text-red-600 text-center">{error.message!}</p>}

			<ul className="flex flex-col-reverse">
				{!areStreamersEmpty ? (
					streamers.map((streamer) => {
						return <StreamerCard key={streamer.id} id={streamer.id} name={streamer.name} />;
					})
				) : (
					<div className="w-full text-md text-center">Nothing added yet</div>
				)}
			</ul>
		</section>
	);
}
