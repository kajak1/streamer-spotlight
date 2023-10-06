import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRandomImage } from "../hooks/use-random-image";
import { streamersService } from "../services/streamers.service";
import { Streamer } from "../shared.types";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	// const sendWithCookies = streamersService.attachCookiesOnce_SSR(streamersService.getAll);
	// const user = await sendWithCookies(ctx.req.cookies, "/streamers");

	const streamers = await streamersService.getAll();
	console.log("getStaticPaths(); streamers:", streamers);

	if (!streamers) {
		return {
			paths: [],
			fallback: "blocking",
		};
	}

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

type StreamerStaticProps = {
	streamer: Streamer;
};

type StaticParams = {
	id: string;
};

export const getStaticProps: GetStaticProps<StreamerStaticProps, StaticParams> = async ({ params }) => {
	if (typeof params?.id === "undefined") {
		return {
			notFound: true,
		};
	}

	try {
		const streamer = await streamersService.getSpecific(params.id);

		return {
			props: {
				streamer,
			},
			revalidate: 30,
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};

export default function StreamerDetails({ streamer }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
	const { data: imageSrc } = useRandomImage(() => streamer.name);

	return (
		<article className="w-full sm:w-3/4 p-4 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600">
			<div className="flex flex-row items-center justify-between ">
				<span className="inline-block relative aspect-square rounded-full h-36 border-2 border-gray-300">
					{imageSrc ? (
						<Image src={URL.createObjectURL(imageSrc)} alt="Streamer's image" className="rounded-full" fill />
					) : (
						<Image src="/fallback_image.png" sizes="50" alt="Streamer's image" className="rounded-full" fill />
					)}
				</span>
			</div>
			<h1 className="text-4xl flex-1 py-4">{streamer.name}</h1>
			<h2 className="text-2xl flex-1 py-4">{streamer.platformId} streamer</h2>
			<section className="py-4">
				<h2 className="text-3xl">Description: </h2>
				<p className="pt-4">{streamer.description || "No description provided"}</p>
			</section>
		</article>
	);
}
