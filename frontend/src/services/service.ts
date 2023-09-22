import axios, { AxiosInstance } from "axios";

const API_ADDRESS = `http://${process.env.API_ADDRESS || process.env.NEXT_PUBLIC_API_ADDRESS}`;

export abstract class Service {
	protected api: AxiosInstance;

	constructor(protected BASE_URL: string = API_ADDRESS) {
		this.api = axios.create({
			baseURL: this.BASE_URL,
		});
	}
}
