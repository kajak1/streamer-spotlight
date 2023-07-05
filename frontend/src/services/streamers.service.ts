import axios, { AxiosInstance } from "axios";
import { Streamer, StreamerForm, Vote } from "../shared.types";

interface VoteProps {
	id: string;
	voteType: Vote;
}

class StreamersService {
	private STREAMERS_ENDPOINT = "/streamers";
	private BASE_URL = "http://localhost:3001";

	private api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: this.BASE_URL,
		});
	}

	getAll = async () => {
		const response = await this.api.get<Streamer[]>(this.STREAMERS_ENDPOINT);

		return response.data;
	};

	getSpecific = async ({ id }: { id: string }) => {
		const response = await this.api.get<Streamer>(
			`${this.STREAMERS_ENDPOINT}/${id}`
		);

		return response.data;
	};

	async create({ streamerData }: { streamerData: StreamerForm }) {
		const response = await this.api.post<Streamer>(
			this.STREAMERS_ENDPOINT,
			streamerData
		);

		return response.data;
	}

	vote = async ({ id, voteType }: VoteProps) => {
		const response = await this.api.put<{ message: "voted successfully" }>(
			`${this.STREAMERS_ENDPOINT}/${id}/vote`,
			{
				voteType,
			}
		);

		return response.data;
	};
}

export const streamersService = new StreamersService();
