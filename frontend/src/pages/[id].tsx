import type {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	InferGetServerSidePropsType,
	InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { useRandomImage } from "../hooks/use-random-image";
import { streamersService } from "../services/streamers.service";
import { Streamer } from "../shared.types";

export const getStaticPaths: GetStaticPaths = async () => {
	const streamers = await streamersService.getAll();

	const ids = streamers.map(({ id }) => {
		return {
			params: { id },
		};
	});

	return {
		paths: ids,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<
	{ streamer: Streamer },
	{ id: string }
> = async ({ params }) => {
	if (typeof params?.id === "undefined") {
		return {
			notFound: true,
		};
	}

	const streamer = await streamersService.getSpecific({ id: params.id });

	return {
		props: {
			streamer,
		},
		revalidate: 30,
	};
};

export default function StreamerDetails({
	streamer,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
	const { data: imageSrc } = useRandomImage(() => streamer.name);

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
			<h1 className="text-4xl flex-1 py-4">{streamer.name}</h1>
			<h2 className="text-2xl flex-1 py-4">{streamer.platform} streamer</h2>
			<section className="py-4">
				<h2 className="text-3xl">Description: </h2>
				<p className="pt-4">
					{streamer.description || "No description provided"}
				</p>
			</section>
		</article>
	);
}
