import { GetAllResponse } from "@/src/shared.types";
import { faHeart as faHeart_regular } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRandomImage } from "../../hooks/use-random-image";
import { VoteButton } from "../VoteButton";
import { useStreamerCard } from "./use-streamer-card";

export interface StreamerCardProps {
	id: GetAllResponse["id"];
	name: GetAllResponse["name"];
}

export function StreamerCard(props: StreamerCardProps): JSX.Element {
	const { handleVote, votes, areVotesLoading, votesError, isUpvoted, isDownvoted } = useStreamerCard(props);
	const { data: image } = useRandomImage(props.name);

	if (areVotesLoading) {
		return <div>Loading votes for #{props.id}...</div>;
	}

	if (!votes) {
		return <div>votes are undefined</div>;
	}

	if (votesError) {
		return <div>An error occured while loading votes</div>;
	}

	return (
		<li className="w-full h-24 flex flex-row py-1 px-2 hover:bg-slate-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800/50 border-2 border-b-0 first:border-b-2 rounded-md">
			<div className="relative aspect-square rounded-full h-5/6 border-2 self-center dark:border-gray-600 mr-2">
				{image ? (
						<Image
							src={URL.createObjectURL(image)}
							alt="Streamer's image"
							className="rounded-full"
							fill
						/>
					) : (
						<Image
							src="/fallback_image.png"
							sizes="50px"
							alt="Streamer's image"
							className="rounded-full"
							fill
						/>
					)}
			</div>
			<div className="flex-1 flex flex-col justify-evenly sm:flex-row sm:justify-between sm:items-center">
				<h3 className="text-center text-xl sm:text-left break-all sm:w-1/3">{props.name}</h3>
				<div className="flex flex-row justify-end gap-4 sm:w-2/3">
					<VoteButton
						amount={votes._count.Upvote}
						onClick={isUpvoted ? handleVote("upvote", "remove") : handleVote("upvote", "add")}
					>
						<FontAwesomeIcon icon={isUpvoted ? faHeart : faHeart_regular} className=" text-red-600" />
					</VoteButton>
					<VoteButton
						amount={votes._count.Downvote}
						onClick={isDownvoted ? handleVote("downvote", "remove") : handleVote("downvote", "add")}
					>
						<FontAwesomeIcon icon={isDownvoted ? faHeart : faHeart_regular} className=" text-black" />
					</VoteButton>
					<Link
						href={`/${encodeURIComponent(props.id)}`}
						className="h-fit border-1 px-2 py-1 rounded-md border-gray-300 hover:bg-gray-300 bg-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 dark:border-blue-700"
					>
						See details
					</Link>
				</div>
			</div>
		</li>
	);
}
