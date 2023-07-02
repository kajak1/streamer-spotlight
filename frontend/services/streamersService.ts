import axios, { AxiosInstance } from "axios";
import { FormSchema } from "../pages/StreamerForm";

interface VoteProps {
	id: string;
	voteType: "upvote" | "downvote";
}

class StreamersService {
	STREAMERS_ENDPOINT = "/streamers";
	BASE_URL = "http://localhost:3001";

	api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: this.BASE_URL,
		});
	}

	getAll = async () => {
		const response = await this.api.get(this.STREAMERS_ENDPOINT);

		return response.data;
	};

	getSpecific = async ({ id }: { id: string }) => {
		const response = await this.api.get(`${this.STREAMERS_ENDPOINT}/${id}`);

		return response.data;
	};

	async create({ streamerData }: { streamerData: FormSchema }) {
		const response = await this.api.post(this.STREAMERS_ENDPOINT, streamerData);

		return response.data;
	}

	vote = async ({ id, voteType }: VoteProps) => {
		const response = await this.api.put(
			`${this.STREAMERS_ENDPOINT}/${id}/vote`,
			{
				voteType,
			}
		);

		return response.data;
	};
}

export const streamersService = new StreamersService();
