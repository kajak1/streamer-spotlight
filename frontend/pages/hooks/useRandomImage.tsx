import useSWR, { SWRResponse } from "swr";

interface Props {}

const fetcher = (url: string) => fetch(url).then((res) => res.blob());

type Seed = string | undefined | null;

const getURL = (seed: string) =>
	`https://picsum.photos/seed/${encodeURIComponent(seed || "placeholder")}/200`;

function useRandomImage(seed: Seed): SWRResponse<Blob, any, any> {
	const swrResponse = useSWR(seedAction, fetcher);

	function seedAction() {
		if (!seed) return false;

		return getURL(seed);
	}

	return swrResponse;
}

export { useRandomImage };
