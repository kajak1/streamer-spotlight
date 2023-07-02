import { streamersService } from "@/src/services/streamers.service";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useRandomImage } from "../hooks/useRandomImage";
import Image from "next/image";
import { Streamer } from "../shared.types";
import { useStreamer } from "../hooks/useStreamer";

export default function StreamerDetails(): JSX.Element {
	const { query } = useRouter();
	const { streamerData, isLoading } = useStreamer(
		Array.isArray(query.details) ? query.details[0] : query.details
	);

	const { data: imageSrc } = useRandomImage(() => streamerData?.name);

	if (isLoading || !streamerData) return <div>Loading...</div>;

	return (
		<article className="w-full sm:w-3/4 p-4 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600">
			<div className="flex flex-row items-center justify-between ">
				<span className="inline-block relative aspect-square rounded-full h-36 border-2 border-gray-300">
					<Image
						src={
							imageSrc ? URL.createObjectURL(imageSrc) : "/fallback_image.png"
						}
						alt="Streamer's image"
						className="rounded-full"
						fill
					/>
				</span>
			</div>
			<h1 className="text-4xl flex-1 py-4">{streamerData?.name}</h1>
			<h2 className="text-2xl flex-1 py-4">
				{streamerData?.platform} streamer
			</h2>
			<section className="py-4">
				<h2 className="text-3xl">Description: </h2>
				<p className="pt-4">
					{streamerData?.description || "No description provided"}
				</p>
			</section>
		</article>
	);
}
