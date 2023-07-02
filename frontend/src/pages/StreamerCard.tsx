import { faHeart, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRandomImage } from "../hooks/useRandomImage";
import { useStreamer } from "../hooks/useStreamer";
import { streamersService } from "../services/streamers.service";
import type { Streamer, Vote } from "../shared.types";
import { socket } from "../socket";
import { EVENTS } from "../websocket.config";

type Props = Pick<Streamer, "id">;

function StreamerCard({ id }: Props): JSX.Element {
	const { streamerData, isLoading: isStreamerLoading } = useStreamer(id);
	const { data: image, isLoading: isImageLoading } = useRandomImage(
		() => streamerData?.name
	);

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

	if (isStreamerLoading || isImageLoading || !streamerData)
		return <span>Loading...</span>;

	return (
		<div className="w-full h-24 flex flex-row py-1 hover:bg-slate-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800/50 border-2 border-b-0 rounded-md">
			<div className="relative aspect-square rounded-full h-5/6 border-2 self-center mx-2 dark:border-gray-600">
				<Image
					src={image ? URL.createObjectURL(image) : "/fallback_image.png"}
					alt="Streamer's image"
					className="rounded-full"
					fill
				/>
			</div>
			<div className="flex-1 flex flex-col justify-evenly sm:flex-row sm:justify-between sm:items-center">
				<h3 className="text-center text-xl sm:text-left break-all sm:w-1/3">
					{streamerData.name}
				</h3>
				<div className="flex flex-row justify-end gap-4 sm:w-2/3">
					<span>
						<button
							className="text-lg sm:text-xl"
							onClick={handleVote("upvote")}
						>
							<FontAwesomeIcon icon={faHeart} className=" text-red-600 " />
							&nbsp;{streamerData.upvotes}
						</button>
					</span>
					<span>
						<button
							className="text-lg sm:text-xl"
							onClick={handleVote("downvote")}
						>
							<FontAwesomeIcon icon={faThumbsDown} />
							&nbsp;{streamerData.downvotes}
						</button>
					</span>
					<Link
						href={`/${encodeURIComponent(id)}`}
						className="h-fit border-1 p-1 rounded-md border-gray-300 hover:bg-gray-300 bg-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 dark:border-blue-700"
					>
						See details
					</Link>
				</div>
			</div>
		</div>
	);
}

export { StreamerCard };
