import { useStreamers } from "@/src/hooks/use-streamers";
import { socket } from "@/src/socket";
import { SWR_KEYS } from "@/src/swr-keys";
import { EVENTS } from "@/src/websocket.config";
import { useEffect } from "react";
import { mutate } from "swr";

function useStreamerList() {
	const streamersHelpers = useStreamers();

	const streamers = streamersHelpers.streamers;

	useEffect(() => {
		socket.connect();

		socket.on(EVENTS.STREAMER_ADDED, (newStreamer) => {
			mutate(SWR_KEYS.STREAMERS, streamers ? [...streamers, newStreamer] : [newStreamer]);
		});

		return () => {
			socket.off(EVENTS.STREAMER_ADDED);

			socket.disconnect();
		};
	}, [streamers]);

	return streamersHelpers;
}

export { useStreamerList };
