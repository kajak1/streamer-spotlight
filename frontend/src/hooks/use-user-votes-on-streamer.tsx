import useSWR from "swr";
import { usersService } from "../services/users.service";
import { SWR_KEYS } from "../swr-keys";

export function useUserVotesOnStreamer(id: string) {
	const { data } = useSWR([SWR_KEYS.VOTES, id], () => usersService.getVotesOnStreamer(id));

	return data;
}
