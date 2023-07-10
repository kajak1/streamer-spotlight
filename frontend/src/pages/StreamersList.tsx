import { useRouter } from "next/router";
import { useEffect } from "react";
import { mutate } from "swr";
import { useStreamers } from "../hooks/useStreamers";
import { socket } from "../socket";
import { SWR_KEYS } from "../swr-keys";
import { EVENTS } from "../websocket.config";
import StreamerCard from "./StreamerCard";

function StreamersList(): JSX.Element {
	const router = useRouter();
	const { streamers, error } = useStreamers();

	useEffect(() => {
		socket.connect();

		socket.on(EVENTS.STREAMER_ADDED, (newStreamer) => {
			mutate(
				SWR_KEYS.GET_ALL,
				streamers ? [...streamers, newStreamer] : [newStreamer]
			);
		});

		return () => {
			socket.off(EVENTS.STREAMER_ADDED);

			socket.disconnect();
		};
	}, [streamers, router]);

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

export default StreamersList;
