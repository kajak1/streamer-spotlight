import { Service } from "./service";

class UsersService extends Service {
	private USERS_ENDPOINT = "/users";

	constructor() {
		super({
			withCredentials: true,
		});
	}

	getData = async () => {
		const response = await this.api.get<User>(`${this.USERS_ENDPOINT}/me`, { withCredentials: true });

		return response.data;
	};

	getVotes = async () => {
		const response = await this.api.get<GetVotesResponse>(`${this.USERS_ENDPOINT}/votes`);

		return response.data;
	};

	getVotesOnStreamer = async (streamerId: string) => {
		const response = await this.api.get<GetVotesOnStreamerResponse>(`${this.USERS_ENDPOINT}/votes/${streamerId}`);

		return response.data;
	};
}

export const usersService = new UsersService();

export interface User {
	id: string;
	username: string;
	password: string;
}

interface GetVotesResponse {
	id: string;
	Upvote: Array<{ streamerId: string }>;
	Downvote: Array<{ streamerId: string }>;
}

interface GetVotesOnStreamerResponse {
	userId: string;
	isUpvoted: boolean;
	isDownvoted: boolean;
}
