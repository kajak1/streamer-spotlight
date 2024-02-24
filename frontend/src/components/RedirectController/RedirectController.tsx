import { useIsRouting } from "@/src/hooks/use-is-routing";
import { Url } from "next/dist/shared/lib/router/router";
import Router from "next/router";
import { ReactNode, useEffect } from "react";
import { useUser } from "../../hooks/use-user";

function redirect(url: Url): void {
  if (Router.asPath !== url) {
    Router.replace(url);
  }
}

export function RedirectController({ children }: { children: ReactNode }) {
  const { loggedOut } = useUser();
  const isRouting = useIsRouting();

  console.log("RedirectController.render(), loggedOut:", loggedOut);

  useEffect(() => {
    if (isRouting) return;
    if (!Router.isReady) return;

    if (loggedOut) {
      redirect("/login");
    } else {
      redirect("/");
    }
  }, [loggedOut, isRouting]);
  // }, [loggedOut]);

  return children;
}
