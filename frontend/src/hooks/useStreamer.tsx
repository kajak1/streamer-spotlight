import useSWR from "swr";
import { streamersService } from "../services/streamers.service";
import { SWR_KEYS } from "../swr-keys";

function useStreamer(id: string | null | undefined) {
	const { data, isLoading, error, mutate, isValidating } = useSWR(
		id ? SWR_KEYS.GET_SPECIFIC(id) : null,
		() => streamersService.getSpecific({ id: id as string })
	);

	return {
		streamerData: data,
		isLoading,
		error,
		mutate,
		isValidating,
	};
}

export { useStreamer };
