import { usersService } from "@/src/services/users.service";
import { SWR_KEYS } from "@/src/swr-keys";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export function useLogin({ redirect }: { redirect?: string }) {
	const { data: user, error } = useSWR(SWR_KEYS.USER, usersService.getData);

	useEffect(() => {
		if (redirect && !error) {
			console.log(`useLogin, replacing to ${redirect}`);
			Router.replace(redirect);
		}
	}, [redirect, user, error]);

	return { user: error ? undefined : user };
}
