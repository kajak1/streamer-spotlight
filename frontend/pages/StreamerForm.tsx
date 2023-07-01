import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import useSWRMutation from "swr/mutation";

interface Props {}

const FormSchema = z.object({
	name: z.string(),
	platform: z.union([z.literal("Twitch"), z.literal("Kick")]),
	description: z.string(),
});

type FormSchema = z.infer<typeof FormSchema>;

function validate(formData: FormSchema) {
	FormSchema.parse(formData);
}

const sendRequest = (url: string, { arg }: { arg: FormSchema }) =>
	fetch(url, {
		method: "POST",
		body: JSON.stringify(arg),
	}).then((res) => res.json());

function StreamerForm(): JSX.Element {
	const [formValues, setFormValues] = useState<FormSchema>({
		name: "",
		platform: "Twitch",
		description: "",
	});

	const { trigger, isMutating } = useSWRMutation(
		"http://localhost:3001/streamers",
		sendRequest
	);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		console.log(formValues);
		validate(formValues);
		await trigger(formValues);
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
				disabled={isMutating}
				onClick={handleSubmit}
				className="b-2 bg-indigo-500 rounded-md py-1 px-3"
			>
				Submit
			</button>
		</form>
	);
}

export { StreamerForm };
