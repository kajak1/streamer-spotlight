import { StreamerCard } from "../StreamerCard";
import { useStreamerList } from "../StreamerList/use-streamers-list";
import { StreamerListItem } from "../StreamerListItem";

export function StreamerListItems(): JSX.Element {
  const { streamers, error, isLoading } = useStreamerList();

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      {Boolean(error) && (
        <p className="text-center text-red-600">{error.message}</p>
      )}
      <ul className="flex flex-col-reverse items-center gap-2 bg-slate-200">
        {streamers?.length ? (
          streamers.map((streamer) => {
            return (
              <StreamerListItem
                key={streamer.id}
                id={streamer.id}
                name={streamer.name}
              />
            );
          })
        ) : (
          <div className="text-md w-full text-center">Nothing is added yet</div>
        )}
      </ul>
    </>
  );
}
