import { StreamerCard } from "../StreamerCard";
import { useStreamersList } from "./use-streamers-list";

export function StreamersList(): JSX.Element {
	const { streamers, error } = useStreamersList();

	if (error || typeof streamers === "undefined")
		return <div>Failed to load</div>;

	const areStreamersEmpty = streamers.length === 0;

	return (
		<article className="w-full py-6">
			<h2 className="text-xl pb-4 dark:text-white">Streamers:</h2>
			<ul className="flex flex-col-reverse">
				{!areStreamersEmpty ? (
					streamers.map((streamer) => {
						return (
							<li key={streamer.id}>
								<StreamerCard
									id={streamer.id}
									name={streamer.name}
									initialUpvotes={streamer.upvotes}
									initialDownvotes={streamer.downvotes}
								/>
							</li>
						);
					})
				) : (
					<div className="w-full text-md text-center">Nothing added yet</div>
				)}
			</ul>
		</article>
	);
}
