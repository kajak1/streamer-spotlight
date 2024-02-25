import { GetAllResponse } from "@/src/shared.types";
import Image from "next/image";
import Link from "next/link";
import { useRandomImage } from "../../hooks/use-random-image";
import { VoteButton } from "../VoteButton";
import { VoteButtonGroup } from "../VoteButtonGroup";
import { useStreamerListItem } from "./use-streamer-list-item";

export interface StreamerListItemProps {
  id: GetAllResponse["id"];
  name: GetAllResponse["name"];
}

export function StreamerListItem(props: StreamerListItemProps): JSX.Element {
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

  const upvoteButton = (
    <VoteButton
      className="flex flex-1 flex-row items-start justify-center"
      amount={votes._count.Upvote}
      onClick={
        isUpvoted ? handleVote("upvote", "remove") : handleVote("upvote", "add")
      }
    >
      <Image src="/arrow-up.svg" alt="upvote arrow" width={18} height={25} />
    </VoteButton>
  );

  const downvoteButton = (
    <VoteButton
      className="flex flex-1 flex-row items-end justify-center"
      amount={votes._count.Downvote}
      onClick={
        isDownvoted
          ? handleVote("downvote", "remove")
          : handleVote("downvote", "add")
      }
    >
      <Image
        src="/arrow-down.svg"
        alt="downvote arrow"
        width={18}
        height={25}
      />
    </VoteButton>
  );

  return (
    <li className="flex aspect-[27/7] h-28 gap-5 rounded-lg border-1 border-gray-500 bg-white px-5 py-4">
      {/* <li className="flex w-3/5 rounded-md border-1 border-gray-700 bg-white"> */}
      {/* <li className="flex w-3/5 gap-1"> */}

      <VoteButtonGroup buttons={[upvoteButton, downvoteButton]} />
      <div className="flex flex-1 gap-5 rounded-md border-gray-700  bg-white">
        <div className="relative aspect-square h-20 overflow-hidden rounded-full dark:border-gray-600">
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
              fill
            />
          )}
        </div>
        <div className="grid flex-1 flex-shrink-0 grid-rows-2">
          <h3 className="break-all text-xl flex items-center">{props.name}</h3>
          <span className="break-all text-lg text-gray-500">{props.name}</span>
        </div>
        <Link
          href={`/${encodeURIComponent(props.id)}`}
          className="self-center rounded-md border-1 border-gray-300 px-4 py-2 text-sm font-normal leading-4 text-blue-500 active:bg-gray-800 active:font-medium active:text-white"
          // className="h-fit border-1 px-2 py-1 rounded-md border-gray-300 hover:bg-gray-300 bg-gray-200 dark:bg-blue-800 dark:hover:bg-blue-900 dark:border-blue-700"
        >
          Details
        </Link>
      </div>
    </li>
  );
}

/*
  buttons below image
 return (
    <li className="flex w-3/5 rounded-md border-1 border-gray-700 bg-white pr-4 hover:bg-slate-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800/50">
      <div className="mr-5 flex flex-col">
        <div className="relative  aspect-square h-24 overflow-hidden bg-sky-300 dark:border-gray-600">
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
        <VoteButtonGroup buttons={[upvoteButton, downvoteButton]} />
      </div>
      <div className="grid flex-1 grid-rows-1">
        <div className="pt-2">
          <h3 className="break-all text-xl font-semibold">{props.name}</h3>
          <span className="break-all text-lg font-semibold text-gray-500">
            {props.name}
          </span>
        </div>
        <div className="flex items-center justify-end pb-4">
          </div>
          </div>
        </li>
      );

*/

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
