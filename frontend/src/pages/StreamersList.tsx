import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { useStreamers } from "../hooks/useStreamers";
import type { Streamer } from "../shared.types";
import { socket } from "../socket";
import { EVENTS } from "../websocket.config";
import { StreamerCard } from "./StreamerCard";

type UpdatedStreamer = Pick<Streamer, "id" | "upvotes" | "downvotes">;

function StreamersList(): JSX.Element {
	const { streamers, isLoading, error } = useStreamers();

	useEffect(() => {
		socket.connect();

		socket.on(EVENTS.STREAMER_ADDED, (newStreamer) => {
			mutate(
				"api/getAll",
				streamers ? [...streamers, newStreamer] : [newStreamer]
			);
		});

		socket.on(EVENTS.VOTE, (updated: UpdatedStreamer) => {
			if (typeof streamers === "undefined") {
				toast.error("Cannot update votes when there are no streamers");
				return;
			}

			const found = streamers.find((streamer) => streamer.id === updated.id);

			if (!found) {
				toast.error("Couldn't find streamer to update");
				return;
			}

			const newStreamer: Streamer = {
				...found,
				upvotes: updated.upvotes,
				downvotes: updated.downvotes,
			};

			mutate(`api/getSpecific/${updated.id}`, newStreamer, {
				revalidate: false,
			});
		});

		return () => {
			socket.off(EVENTS.STREAMER_ADDED);
			socket.off(EVENTS.VOTE);

			socket.disconnect();
		};
	}, [streamers]);

	if (error) return <div>An error has occurred.</div>;
	if (isLoading) return <div>Loading...</div>;

	const areStreamersEmpty = !streamers || streamers.length === 0;

	return (
		<article className="w-full py-6">
			<h2 className="text-xl pb-4 dark:text-white">Streamers:</h2>
			<ul>
				{!areStreamersEmpty ? (
					streamers.map((streamer) => {
						return (
							<li key={streamer.id}>
								<StreamerCard id={streamer.id} />
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

export { StreamersList };
