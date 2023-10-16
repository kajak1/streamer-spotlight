import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { streamersService } from "../services/streamers.service";
import { usersService } from "../services/users.service";
import { Streamer } from "../shared.types";
import { isAxiosError } from "axios";
import { StreamerList } from "../components/StreamerList";
import { StreamerListItems } from "../components/StreamerListItems";
import { StreamerListItem } from "../components/StreamerListItem";

export const getServerSideProps: GetServerSideProps<UploadedProps> = async (
  ctx,
) => {
  const { sessionId } = ctx.req.cookies;

  if (!sessionId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const getDataWithCookies = usersService.injectCookies(
      usersService.getData,
    );
    const { id } = await getDataWithCookies(ctx.req.cookies, "/users/me");

    const getByUserWithCookies = streamersService.injectCookies(
      streamersService.getByUser,
      id,
    );

    const streamers = await getByUserWithCookies(
      ctx.req.cookies,
      `/streamers/users/${id}`,
    );

    return {
      props: {
        streamers,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

interface UploadedProps {
  streamers: Streamer[];
}

export default function Uploaded({
  streamers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <StreamerList>
      {streamers.map((streamer) => {
        return (
          <StreamerListItem
            key={streamer.id}
            id={streamer.id}
            name={streamer.name}
          />
        );
      })}
    </StreamerList>
  );
}
