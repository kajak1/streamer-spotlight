import { isAxiosError } from "axios";
import Link from "next/link";
import Router from "next/router";
import { FormEvent, useState } from "react";
import { mutate } from "swr";
import { authService } from "../../services/auth.service";
import { SWR_KEYS } from "../../swr-keys";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const resposne = await authService.login({ username, password });
			console.log("Login response:", resposne.data);
			Router.replace("/");
			mutate(SWR_KEYS.USER);
		} catch (e) {
			if (isAxiosError(e)) {
				console.error("Failed to login", e.response?.data);
			}
		}
	}

	return (
		<div>
			<h1>Login form</h1>
			<form onSubmit={handleSubmit} className="flex flex-col items-stretch" autoComplete="off">
				<label htmlFor="username">username</label>
				<input
					className="text-black"
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password">password</label>
				<input
					className="text-black"
					type="text"
					name="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Log in</button>
			</form>
			<Link href="/register">Create account</Link>
		</div>
	);
}
