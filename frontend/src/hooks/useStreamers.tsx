import useSWR from "swr";
import { streamersService } from "../services/streamers.service";
import { Streamer } from "../shared.types";
import { SWR_KEYS } from "../swr-keys";

function useStreamers() {
	const { data, isLoading, error, isValidating, mutate } = useSWR<Streamer[]>(
		SWR_KEYS.GET_ALL,
		streamersService.getAll
	);

	return {
		streamers: data,
		isLoading,
		error,
		isValidating,
		mutate,
	};
}

export { useStreamers };
