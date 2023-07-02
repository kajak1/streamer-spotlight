import useSWR, { SWRResponse } from "swr";
import { imagesService } from "../services/images.service";

type Seed = string | undefined | null;

function useRandomImage(
	seed: Seed | (() => Seed)
): SWRResponse<Blob, any, any> {
	const swrResponse = useSWR(seed, imagesService.getImage);

	return swrResponse;
}

export { useRandomImage };
