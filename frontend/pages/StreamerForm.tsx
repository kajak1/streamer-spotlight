import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import useSWR from "swr";
import { Streamer } from ".";
import { streamersService } from "../services/streamersService";

const FormSchema = z.object({
	name: z.string().nonempty(),
	platform: z.union([
		z.literal("Twitch"),
		z.literal("Kick"),
		z.literal("YouTube"),
		z.literal("TikTok"),
		z.literal("Rumble"),
	]),
	description: z.string().nonempty(),
});

export type FormSchema = z.infer<typeof FormSchema>;

function validate(formData: FormSchema) {
	FormSchema.parse(formData);
}

function StreamerForm(): JSX.Element {
	const [formValues, setFormValues] = useState<FormSchema>({
		name: "",
		platform: "Twitch",
		description: "",
	});

	const { isLoading, mutate } = useSWR<Streamer[]>("all");

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		try {
			validate(formValues);
			await streamersService.create({ streamerData: formValues });
			mutate();
		} catch (e) {
			console.error(e);
		}
	}

	function handleChange(fieldName: keyof FormSchema) {
		return function handler(
			e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
		) {
			setFormValues({ ...formValues, [fieldName]: e.target.value });
		};
	}

	return (
		<form action="" onSubmit={handleSubmit}>
			<h3 className="pb-4 text-xl">Upload your favourite streamer!</h3>
			<div className="py-1">
				<label htmlFor="Name">Name</label>
				<input
					id="name"
					onChange={handleChange("name")}
					className="text-black"
				/>
			</div>
			<div className="py-1">
				<label htmlFor="Platform">Select platform: </label>
				<select
					id="Platform"
					onChange={handleChange("platform")}
					className="text-black"
				>
					<option value="Twitch">Twitch</option>
					<option value="Kick">Kick</option>
					<option value="YouTube">YouTube</option>
					<option value="TikTok">TikTok</option>
					<option value="Rumble">Rumble</option>
				</select>
			</div>
			<div className="py-1">
				<label htmlFor="Description">Description:</label>
				<input
					id="Description"
					onChange={handleChange("description")}
					className="text-black"
				/>
			</div>

			<button
				disabled={isLoading}
				onClick={handleSubmit}
				className="b-2 bg-indigo-500 rounded-md py-1 px-3"
			>
				Submit
			</button>
		</form>
	);
}

export { StreamerForm };
