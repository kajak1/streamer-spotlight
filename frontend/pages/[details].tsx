import { streamersService } from "@/services/streamersService";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Streamer } from ".";
import { useRandomImage } from "./hooks/useRandomImage";
import Image from "next/image";
import { Header } from "./Header";

interface Props {}

export default function StreamerDetails(): JSX.Element {
	const { query } = useRouter();
	const { data, isLoading } = useSWR<Streamer | null>(
		() => (typeof query.details === "string" ? "details" : null),
		() => streamersService.getSpecific({ id: query.details as string })
	);

	const { data: imageSrc } = useRandomImage(data?.name);

	if (isLoading) return <div>loading...</div>;

	return (
		<main className="flex flex-col items-center min-h-screen px-2 sm:px-36 md:px-48 lg:px-64 xl:px-96">
			<Header />
			<article className="border-2 w-3/4">
				<div className="flex flex-row items-center justify-between p-4">
					<span className="inline-block relative aspect-square rounded-full h-28 border-2">
						<Image
							src={
								imageSrc ? URL.createObjectURL(imageSrc) : "/fallback_image.png"
							}
							alt="Streamer's image"
							className="rounded-full"
							fill
						/>
					</span>
					<h1 className="text-center text-5xl flex-1">{data?.name}</h1>
				</div>
				<section className="p-4">
					<h2 className="text-3xl">Description: </h2>
					<p>{data?.description}</p>
				</section>
			</article>
		</main>
	);
}
