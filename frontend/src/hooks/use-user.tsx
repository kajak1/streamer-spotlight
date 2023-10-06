import { AxiosError } from "axios";
import useSWR from "swr";
import { User, usersService } from "../services/users.service";
import { SWR_KEYS } from "../swr-keys";

export function useUser() {
	const { data: user, isLoading, isValidating, error } = useSWR<User, AxiosError>(SWR_KEYS.USER, usersService.getData);

	const loading = isLoading || isValidating || (!user && !error);
	const loggedOut = !user || (error && error.response?.status === 403) || (error && error.response?.status === 401);

	return { user, loading, loggedOut: Boolean(loggedOut) };
}
