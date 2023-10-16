import { ReactNode, useCallback, useEffect, useState } from "react";
import { useUser } from "../../hooks/use-user";
import Router from "next/router";

export function RedirectController({ children }: { children: ReactNode }) {
  const { loggedOut } = useUser();
  const [routeChanged, setRouteChanged] = useState(false);

  const handleStartRouting = useCallback(() => {
    setRouteChanged(true);
  }, []);

  const handleStopRouting = useCallback(() => {
    setRouteChanged(false);
  }, []);

  useEffect(() => {
    console.log(`RedirectController running loggedOut: ${loggedOut}`);
    if (routeChanged) return;
    if (!Router.isReady) return;

    Router.events.on("routeChangeStart", handleStartRouting);
    Router.events.on("routeChangeComplete", handleStopRouting);
    Router.events.on("routeChangeError", handleStopRouting);

    if (loggedOut) {
      Router.replace("/login");
    } else {
      Router.replace("/");
    }

    return () => {
      Router.events.off("routeChangeStart", handleStartRouting);
      Router.events.off("routeChangeComplete", handleStopRouting);
      Router.events.off("routeChangeError", handleStopRouting);
    };
  }, [loggedOut, handleStartRouting, handleStopRouting, routeChanged]);

  return children;
}
