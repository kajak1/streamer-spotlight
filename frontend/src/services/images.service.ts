import { Service } from "./service";

// TODO extends a Service abstract class
class ImagesService extends Service {
	private IMAGE_ENDPOINT = `/seed`;

	constructor() {
		super("https://picsum.photos");
	}

	getImage = async (seed: string | null | undefined) => {
		const response = await this.api.get(`${this.IMAGE_ENDPOINT}/${encodeURIComponent(seed || "placeholder")}/200`, {
			responseType: "blob",
		});

		return response.data;
	};
}

export const imagesService = new ImagesService();
