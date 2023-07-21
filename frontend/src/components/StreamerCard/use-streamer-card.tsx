import { streamersService } from "@/src/services/streamers.service";
import { Vote } from "@/src/shared.types";
import { ServerToClientEvents, socket } from "@/src/socket";
import { EVENTS } from "@/src/websocket.config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
	id: string;
	name: string;
	initialUpvotes: number;
	initialDownvotes: number;
}

function useStreamerCard({
	id,
	name,
	initialDownvotes,
	initialUpvotes,
}: Props) {
	const [votes, setVotes] = useState({
		upvotes: initialUpvotes,
		downvotes: initialDownvotes,
	});

	useEffect(() => {
		const voteHandler: ServerToClientEvents["VOTE"] = (updated) => {
			if (updated.id !== id) return;

			setVotes({
				...votes,
				upvotes: updated.upvotes,
				downvotes: updated.downvotes,
			});
		};

		socket.on(EVENTS.VOTE, voteHandler);

		return () => {
			socket.off(EVENTS.VOTE, voteHandler);
		};
	}, [id, votes, name]);

	function handleVote(voteType: Vote) {
		return async function makeVote() {
			try {
				await streamersService.vote({ id, voteType });
				if (socket.connected) {
					socket.emit(EVENTS.VOTE, id);
				}
			} catch (e) {
				toast.error("Failed to vote");
				console.error(e);
			}
		};
	}

	return {
		handleVote,
		votes,
		setVotes,
	};
}

export { useStreamerCard };
