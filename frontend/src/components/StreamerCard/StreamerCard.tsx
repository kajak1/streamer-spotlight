import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRandomImage } from "../../hooks/use-random-image";
import type { Streamer } from "../../shared.types";
import { useStreamerCard } from "./use-streamer-card";

interface Props {
	id: Streamer["id"];
	name: Streamer["name"];
	initialUpvotes: Streamer["upvotes"];
	initialDownvotes: Streamer["downvotes"];
}

export function StreamerCard(props: Props): JSX.Element {
	const { handleVote, votes } = useStreamerCard(props);
	const { data: image } = useRandomImage(props.name);

	return (
		<div className="w-full h-24 flex flex-row py-1 px-2 hover:bg-slate-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800/50 border-2 border-b-0 rounded-md">
			<div className="relative aspect-square rounded-full h-5/6 border-2 self-center dark:border-gray-600 mr-2">
				<Image
					src={image ? URL.createObjectURL(image) : "/fallback_image.png"}
					alt="Streamer's image"
					className="rounded-full"
					fill
				/>
			</div>
			<div className="flex-1 flex flex-col justify-evenly sm:flex-row sm:justify-between sm:items-center">
				<h3 className="text-center text-xl sm:text-left break-all sm:w-1/3">
					{props.name}
				</h3>
				<div className="flex flex-row justify-end gap-4 sm:w-2/3">
					<span>
						<button
							className="text-xl pr-2 transition-transform hover:scale-125"
							onClick={handleVote("upvote")}
						>
							<FontAwesomeIcon icon={faHeart} className=" text-red-600" />
						</button>
						<span className="text-xl">{votes.upvotes ?? "loading"}</span>
					</span>
					<span>
						<button
							className="text-xl pr-2 transition-transform hover:scale-125"
							onClick={handleVote("downvote")}
						>
							<FontAwesomeIcon icon={faThumbsDown} />
						</button>
						<span className="text-xl">{votes.downvotes ?? "loading"}</span>
					</span>
					<Link
						href={`/${encodeURIComponent(props.id)}`}
						className="h-fit border-1 px-2 py-1 rounded-md border-gray-300 hover:bg-gray-300 bg-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 dark:border-blue-700"
					>
						See details
					</Link>
				</div>
			</div>
		</div>
	);
}
