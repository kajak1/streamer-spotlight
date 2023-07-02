import axios, { AxiosInstance } from "axios";

class ImagesService {
	private BASE_URL = "https://picsum.photos";
	private IMAGE_ENDPOINT = `/seed`;

	private api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: this.BASE_URL,
		});
	}

	getImage = async (seed: string | null | undefined) => {
		const response = await this.api.get(
			`${this.IMAGE_ENDPOINT}/${encodeURIComponent(seed || "placeholder")}/200`,
			{ responseType: "blob" }
		);

		return response.data;
	};
}

export const imagesService = new ImagesService();
