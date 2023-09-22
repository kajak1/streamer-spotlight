import axios, { AxiosInstance } from "axios";
import { Service } from "./service";

class UsersService extends Service {
	private USERS_ENDPOINT = "/users";
	// private BASE_URL = "http://localhost:3001";

	// private api: AxiosInstance;

	constructor() {
		super();
		// this.api = axios.create({
		// 	baseURL: this.BASE_URL,
		// });
	}

	getVotes = async () => {
		const response = await this.api.get<{
			id: string;
			Upvote: { streamerId: string }[];
			Downvote: { streamerId: string }[];
		}>(`${this.USERS_ENDPOINT}/votes`);

		return response.data;
	};

	getVotesOnStreamer = async (streamerId: string) => {
		const response = await this.api.get<{
			userId: string;
			isUpvoted: boolean;
			isDownvoted: boolean;
		}>(`${this.USERS_ENDPOINT}/votes/${streamerId}`);
		// const response = await this.api.get<{
		// 	id: string;
		// 	Upvote: { streamerId: string }[];
		// 	Downvote: { streamerId: string }[];
		// }>(`${this.USERS_ENDPOINT}/votes/${streamerId}`);

		return response.data;
	};
}

export const usersService = new UsersService();
