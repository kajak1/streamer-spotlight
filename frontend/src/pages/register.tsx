import { isAxiosError } from "axios";
import { useState, FormEvent } from "react";
import { authService } from "../services/auth.service";
import Link from "next/link";

export default function Register(): JSX.Element {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		try {
			const resposne = await authService.register({ username, password });
			console.log("Register response:", resposne.data);
		} catch (e) {
			if (isAxiosError(e)) {
				console.error("Failed to register", e.response?.data);
			}
		}
	}

	return (
		<div>
			<h1>Register form</h1>
			<form onSubmit={handleSubmit} className="flex flex-col items-stretch">
				<label htmlFor="username">username</label>
				<input
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password">password</label>
				<input
					type="text"
					name="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">register</button>
			</form>
			<Link href="/login">Go to /login</Link>
		</div>
	);
}
