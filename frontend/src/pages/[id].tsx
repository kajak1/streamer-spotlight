import type {
  GetServerSideProps,
  InferGetServerSidePropsType
} from "next";
import Image from "next/image";
import { useRandomImage } from "../hooks/use-random-image";
import { streamersService } from "../services/streamers.service";
import { Streamer } from "../shared.types";

type StreamerStaticProps = {
  streamer: Streamer;
};

type StaticParams = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<
  StreamerStaticProps,
  StaticParams
> = async ({ params, req }) => {
  if (typeof params?.id === "undefined") {
    return {
      notFound: true,
    };
  }

  try {
    const getSpecificWithCookies = streamersService.injectCookies(
      streamersService.getSpecific,
      params.id,
    );

    const streamer = await getSpecificWithCookies(
      req.cookies,
      `/streamers/${params.id}`,
    );

    return {
      props: {
        streamer,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default function StreamerDetails({
  streamer,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { data: imageSrc } = useRandomImage(() => streamer.name);

  return (
    <article className="w-full rounded-md bg-gray-200 p-4 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 sm:w-3/4">
      <div className="flex flex-row items-center justify-between ">
        <span className="relative inline-block aspect-square h-36 rounded-full border-2 border-gray-300">
          {imageSrc ? (
            <Image
              src={URL.createObjectURL(imageSrc)}
              alt="Streamer's image"
              className="rounded-full"
              fill
            />
          ) : (
            <Image
              src="/fallback_image.png"
              sizes="50"
              alt="Streamer's image"
              className="rounded-full"
              fill
            />
          )}
        </span>
      </div>
      <h1 className="flex-1 py-4 text-4xl">{streamer.name}</h1>
      <h2 className="flex-1 py-4 text-2xl">{streamer.platformId} streamer</h2>
      <section className="py-4">
        <h2 className="text-3xl">Description: </h2>
        <p className="pt-4">
          {streamer.description || "No description provided"}
        </p>
      </section>
    </article>
  );
}
