import { GetAllResponse } from "@/src/shared.types";
import Image from "next/image";
import Link from "next/link";
import { useRandomImage } from "../../hooks/use-random-image";
import { useStreamerListItem } from "./use-streamer-card";

export interface StreamerCardProps {
  id: GetAllResponse["id"];
  name: GetAllResponse["name"];
}

export function StreamerCard(props: StreamerCardProps): JSX.Element {
  const {
    handleVote,
    votes,
    areVotesLoading,
    votesError,
    didUpvote: isUpvoted,
    didDownvote: isDownvoted,
  } = useStreamerListItem(props);
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
    <li className="mb-4 flex h-64 w-44 flex-col overflow-hidden rounded-md bg-white shadow-lg hover:bg-slate-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800/50">
      <div className="relative w-full basis-28 overflow-hidden bg-sky-300 dark:border-gray-600">
        {image ? (
          <Image
            src={URL.createObjectURL(image)}
            alt="Streamer's image"
            className="object-cover"
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
      <div className="grid flex-1 grid-rows-2">
        <div className="pt-2 px-3">
          <h3 className="break-all text-xl font-bold">{props.name}</h3>
        </div>
        <div className="mb-3 mr-3 flex justify-end">
          <Link
            href={`/${encodeURIComponent(props.id)}`}
            // className="flex-1 self-end rounded-md border-2 border-slate-400 bg-slate-400 px-4 py-1 text-center text-xs font-semibold text-slate-700 active:bg-gray-800 active:font-medium active:text-white"
            className="self-end rounded-sm bg-blue-800/70 px-6 py-2 text-center text-xs font-semibold  text-white active:bg-gray-800 active:font-medium active:text-white"
          >
            See details
          </Link>
        </div>
      </div>
    </li>
  );
}

/*

return (
    <li className="flex h-24 w-full rounded-md px-5 py-3 hover:bg-slate-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800/50">
      <div className="relative mr-5 aspect-square h-full self-center rounded-full dark:border-gray-600">
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
      <div className="flex flex-col flex-1 justify-between">
        <h3 className="break-all text-lg">{props.name}</h3>
        <div className="flex justify-between">
          <VoteButton
            amount={votes._count.Upvote}
            onClick={
              isUpvoted
                ? handleVote("upvote", "remove")
                : handleVote("upvote", "add")
            }
          >
            <FontAwesomeIcon
              icon={isUpvoted ? faHeart : faHeart_regular}
              className=" text-red-600"
            />
          </VoteButton>
          <VoteButton
            amount={votes._count.Downvote}
            onClick={
              isDownvoted
                ? handleVote("downvote", "remove")
                : handleVote("downvote", "add")
            }
          >
            <FontAwesomeIcon
              icon={isDownvoted ? faHeart : faHeart_regular}
              className=" text-black"
            />
          </VoteButton>
        </div>
      </div>
      <Link
        href={`/${encodeURIComponent(props.id)}`}
        className="self-start rounded-md border-2 border-black px-4 py-1 font-semibold active:bg-gray-800 active:font-medium active:text-white"
        // className="h-fit border-1 px-2 py-1 rounded-md border-gray-300 hover:bg-gray-300 bg-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 dark:border-blue-700"
      >
        See details
      </Link>
    </li>
  );

*/
