import { faHeart, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Streamer } from ".";
import { useSWRConfig } from "swr";
import Image from "next/image";
import { streamersService } from "../services/streamersService";
import Link from "next/link";
import { useRandomImage } from "./hooks/useRandomImage";

type Props = Pick<Streamer, "id" | "name" | "upvotes" | "downvotes">;

function StreamerCard({ id, name, upvotes, downvotes }: Props): JSX.Element {
	const { data: image, isLoading } = useRandomImage(name);
	const { mutate } = useSWRConfig();

	function handleVote(voteType: "upvote" | "downvote") {
		return async function makeVote() {
			try {
				await streamersService.vote({ id, voteType });
				mutate("all");
			} catch (e) {
				console.error(e);
			}
		};
	}

	if (isLoading) return <span>Loading...</span>;

	return (
		<div className="w-full flex flex-row py-1 bg-gray-600 hover:bg-opacity-50">
			<span className="inline-block relative aspect-square rounded-full h-14 border-2">
				<Image
					src={image ? URL.createObjectURL(image) : "/fallback_image.png"}
					alt="Streamer's image"
					className="rounded-full"
					fill
				/>
			</span>
			<div className="flex-1 flex-col pl-4">
				<h3>{name}</h3>
				<div className="flex flex-row justify-evenly">
					<span>
						<button onClick={handleVote("upvote")}>
							<FontAwesomeIcon icon={faHeart} className="text-red-600" />
						</button>
						upvote: {upvotes}
					</span>
					<span>
						<button onClick={handleVote("downvote")}>
							<FontAwesomeIcon icon={faThumbsDown} />
						</button>
						downvote: {downvotes}
					</span>
				</div>
				<Link href={`/${encodeURIComponent(id)}`}>See details</Link>
			</div>
		</div>
	);
}

export { StreamerCard };
