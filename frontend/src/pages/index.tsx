import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { StreamerForm } from "../components/StreamerForm";
import { StreamerList } from "../components/StreamerList";
import { Streamer } from "../shared.types";
import { StreamerListItem } from "../components/StreamerListItem";

export const getServerSideProps = (async () => {
  const response = await fetch("http://localhost:3001/streamers");
  const body = await response.json();

  return {
    props: {
      streamers: body as Streamer[],
    },
  };
}) satisfies GetServerSideProps<{ streamers: Streamer[] }>;

export default function Home({
  streamers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <article className="grid w-full grid-cols-2 gap-12">
      <StreamerList>
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
            <div className="text-md w-full text-center">
              Nothing is added yet
            </div>
          )}
        </ul>
      </StreamerList>
      <StreamerForm />
    </article>
  );
}

// export default function Home() {
//   return (
//     <article className="grid w-full grid-cols-2 gap-12">
//       <StreamerList>
//         <StreamerListItems />
//       </StreamerList>
//       <StreamerForm />
//     </article>
//   );
// }
