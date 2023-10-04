import type { UploadBody, VoteTypeBody } from "@backend/shared.types";
import { GetAllResponse, Streamer } from "../shared.types";
import { Service } from "./service";
import { isAxiosError } from "axios";

class StreamersService extends Service {
	private STREAMERS_ENDPOINT = "/streamers";

	constructor() {
		super();
	}

	getAll = async (): Promise<GetAllResponse[]> => {
		try {
			const response = await this.api.get<GetAllResponse[]>(this.STREAMERS_ENDPOINT);

			return response.data;
		} catch (e) {
			if (isAxiosError(e)) {
				if (e.response?.status === 404) return [];
				const serializedError = JSON.stringify(e.response?.data);
				if (serializedError) {
					console.error("serialized: ", serializedError);
				} else {
					console.error(e);
				}
			} else {
				console.error(e);
			}
			throw Error("Failed to fetch the users");
		}
	};

	getSpecific = async (id: string) => {
		const response = await this.api.get<Streamer>(`${this.STREAMERS_ENDPOINT}/${id}`);

		return response.data;
	};

	getVoteCount = async (id: string) => {
		const response = await this.api.get<{
			id: string;
			_count: {
				Downvote: number;
				Upvote: number;
			};
		}>(`${this.STREAMERS_ENDPOINT}/${id}/vote`);

		return response.data;
	};

	async create({ streamerData }: { streamerData: UploadBody }) {
		const response = await this.api.post<Streamer>(this.STREAMERS_ENDPOINT, streamerData);

		return response.data;
	}

	vote = async ({ id, voteType, operation }: VoteTypeBody & { id: string }) => {
		const response = await this.api.put<{ message: string }>(`${this.STREAMERS_ENDPOINT}/${id}/vote`, {
			voteType,
			operation,
		});

		return response.data;
	};
}

export const streamersService = new StreamersService();
