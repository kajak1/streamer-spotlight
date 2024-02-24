import { StreamerForm } from "../components/StreamerForm";
import { StreamerList } from "../components/StreamerList";
import { StreamerListItems } from "../components/StreamerListItems";

export default function Home() {
  return (
    <article className="grid w-full grid-cols-2 gap-12">
      <StreamerList>
        <StreamerListItems />
      </StreamerList>
      <StreamerForm />
    </article>
  );
}