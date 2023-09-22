import { useUserVotesOnStreamer } from "@/src/hooks/use-user-votes-on-streamer";
import { streamersService } from "@/src/services/streamers.service";
import { VoteTypeBody } from "@/src/shared.types";
import { ServerToClientEvents, socket } from "@/src/socket";
import { SWR_KEYS } from "@/src/swr-keys";
import { EVENTS } from "@/src/websocket.config";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { StreamerCardProps } from "./StreamerCard";

type Props = Pick<StreamerCardProps, "id" | "name">;

function useStreamerCard({ id, name }: Props) {
	const { data: votes, isLoading, error } = useSWR([SWR_KEYS.STREAMERS, id], () => streamersService.getVoteCount(id));
	const userVotes = useUserVotesOnStreamer(id);

	const isUpvoted = userVotes?.isUpvoted ?? false;
	const isDownvoted = userVotes?.isDownvoted ?? false;

	useEffect(() => {
		const voteHandler: ServerToClientEvents["VOTE"] = (updated) => {
			if (updated.id !== id) return;

			mutate(
				[SWR_KEYS.STREAMERS, id],
				votes ? { ...votes, upvotes: updated.upvotes, downvotes: updated.downvotes } : votes
			);

			mutate([SWR_KEYS.VOTES, id]);
		};

		socket.on(EVENTS.VOTE, voteHandler);

		return () => {
			socket.off(EVENTS.VOTE, voteHandler);
		};
	}, [id, votes, name]);

	function handleVote(voteType: VoteTypeBody["voteType"], operation: VoteTypeBody["operation"]) {
		return async function makeVote() {
			try {
				await streamersService.vote({ id, voteType, operation });
				if (socket.connected) {
					socket.emit(EVENTS.VOTE, id);
				}
			} catch (e) {
				if (e instanceof AxiosError) toast.error(e.response?.data.error.message);
				console.error(e);
			}
		};
	}

	return {
		handleVote,
		votes,
		areVotesLoading: isLoading,
		votesError: error,
		isDownvoted,
		isUpvoted,
	};
}

export { useStreamerCard };
