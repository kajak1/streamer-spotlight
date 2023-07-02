import useSWR from "swr";
import { streamersService } from "../services/streamers.service";

function useStreamer(id: string | null | undefined) {
	const { data, isLoading, error, mutate, isValidating } = useSWR(
		id ? `api/getSpecific/${id}` : null,
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
