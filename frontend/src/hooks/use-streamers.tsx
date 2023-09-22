import useSWR from "swr";
import { streamersService } from "../services/streamers.service";
import { GetAllResponse, Streamer } from "../shared.types";
import { SWR_KEYS } from "../swr-keys";

function useStreamers() {
	const { data, isLoading, error, isValidating, mutate } = useSWR<GetAllResponse[]>(
		SWR_KEYS.STREAMERS,
		streamersService.getAll
	);

	if (error) console.error("error: ", error)
	return {
		streamers: data,
		isLoading,
		error,
		isValidating,
		mutate,
	};
}

export { useStreamers };
