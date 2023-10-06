import { Input } from "../FormFields";
import { FieldError } from "../FormFields/FieldError";
import { useStreamerForm } from "./use-streamer-form";

interface Props {
	onSubmit: () => void;
}

export function StreamerForm(props: Props): JSX.Element {
	const {
		handleSubmit,
		register,
		trigger,
		formState: { errors },
	} = useStreamerForm(props);

	return (
		<form
			onSubmit={handleSubmit}
			className="dark:text-gray-200 dark:bg-gray-800"
		>
			<h3 className="pb-4 text-xl">Upload</h3>
			<p className="pb-2">Share your favourite streamer with others!</p>
			<div className="flex flex-col py-1">
				<Input
					register={register}
					id="name"
					label="Name"
					className="inline-block h-7 p-2 rounded-md border-2 text-black dark:text-gray-200 dark:bg-gray-700  border-gray-200 dark:border-gray-600"
				/>
				<FieldError
					when={Boolean(errors.name)}
					message={errors.name?.message}
				/>
			</div>
			<div className="flex flex-col py-1">
				<label htmlFor="Platform" className="pb-2">
					Platform
				</label>
				<select
					id="Platform"
					className="text-black rounded-md h-7 pl-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
					{...register("platform")}
				>
					<option value="Twitch">Twitch</option>
					<option value="Kick">Kick</option>
					<option value="YouTube">YouTube</option>
					<option value="TikTok">TikTok</option>
					<option value="Rumble">Rumble</option>
				</select>
				<FieldError
					when={Boolean(errors.platform)}
					message={errors.platform?.message}
				/>
			</div>
			<div className="flex flex-col py-1">
				<label htmlFor="Description" className="pb-2">
					Description
				</label>
				<textarea
					id="Description"
					className="text-black rounded-md border-2 px-2 py-1 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
					{...register("description")}
				/>
				<FieldError
					when={Boolean(errors.description)}
					message={errors.description?.message}
				/>
			</div>

			<button
				onClick={() => trigger()}
				className="w-full b-2 dark:bg-blue-800 dark:hover:bg-blue-900 border-gray-300 hover:bg-gray-300 bg-gray-200 rounded-md py-1 px-3 mt-4"
			>
				Submit
			</button>
		</form>
	);
}
