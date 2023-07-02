import useSWR from "swr";
import { streamersService } from "../services/streamers.service";
import { Streamer } from "../shared.types";

function useStreamers() {
	const { data, isLoading, error, isValidating, mutate } = useSWR<Streamer[]>(
		"api/getAll",
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
