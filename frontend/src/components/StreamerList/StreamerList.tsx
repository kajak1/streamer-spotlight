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
    <section className="justify-self-end">
      {isValidating ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
      {children}
    </section>
  );
}
