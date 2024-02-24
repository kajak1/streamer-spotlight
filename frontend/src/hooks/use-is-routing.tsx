import Router from "next/router";
import { useEffect, useRef } from "react";

export function useIsRouting() {
  const isRoutingRef = useRef(false);
  // const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    function handleStartRouting() {
      isRoutingRef.current = true;
    }

    function handleStopRouting() {
      isRoutingRef.current = false;
    }

    // function handleStartRouting() {
    //   setIsRouting(true);
    // }

    // function handleStopRouting() {
    //   setIsRouting(false);
    // }

    Router.events.on("routeChangeStart", handleStartRouting);
    Router.events.on("routeChangeComplete", handleStopRouting);
    Router.events.on("routeChangeError", handleStopRouting);

    return () => {
      Router.events.off("routeChangeStart", handleStartRouting);
      Router.events.off("routeChangeComplete", handleStopRouting);
      Router.events.off("routeChangeError", handleStopRouting);
    };
  }, []);

  return isRoutingRef.current;
}
