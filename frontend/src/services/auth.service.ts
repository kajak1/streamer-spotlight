import { Service } from "./service";

class AuthService extends Service {
	private AUTH_ENDPOINT = "/auth";

	constructor() {
		super();
	}

	login = async (credentials: LoginBody) => {
		const response = await this.api.post(`${this.AUTH_ENDPOINT}/login`, credentials, { withCredentials: true });

		return response;
	};

	register = async (credetials: LoginBody) => {
		const response = await this.api.post(`${this.AUTH_ENDPOINT}/register`, credetials);

		return response;
	};

	logout = async () => {

		// TODO change delete to post
		const response = await this.api.delete(`${this.AUTH_ENDPOINT}/login`, { withCredentials: true });

		return response
	};
}

export const authService = new AuthService();

interface LoginBody {
	username: string;
	password: string;
}
