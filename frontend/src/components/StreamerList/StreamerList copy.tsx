import { useStreamers } from "@/src/hooks/use-streamers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function StreamerList({ children }: Props): JSX.Element {
  const { isValidating } = useStreamers();

  return (
    <section className="w-full">
      <h2 className="bg-slate-100 py-2 pl-2 text-xl dark:text-white">
        Streamers:
        {isValidating ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
      </h2>
      {children}
    </section>
  );
}
