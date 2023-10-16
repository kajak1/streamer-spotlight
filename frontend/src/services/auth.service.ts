import { Service } from "./service";

class AuthService extends Service {
	private AUTH_ENDPOINT = "/auth";

	constructor() {
		super({
			withCredentials: true,
		});
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
		const response = await this.api.post(`${this.AUTH_ENDPOINT}/logout`, { withCredentials: true });

		return response;
	};
}

export const authService = new AuthService();

interface LoginBody {
	username: string;
	password: string;
}
