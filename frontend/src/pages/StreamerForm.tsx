import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FieldError } from "../components/FieldError";
import { streamersService } from "../services/streamers.service";
import { StreamerFormSchema, type StreamerForm } from "../shared.types";
import { socket } from "../socket";
import { EVENTS } from "../websocket.config";

interface ErrorResponse {
	error: { message: string };
}

function isErrorResponse(e: unknown): e is ErrorResponse {
	return (
		(e as ErrorResponse).error !== undefined &&
		(e as ErrorResponse).error.message !== undefined
	);
}

interface Props {
	onSubmit: () => void;
}

function StreamerForm(props: Props): JSX.Element {
	const {
		register,
		trigger,
		handleSubmit,
		formState: { errors },
	} = useForm<StreamerForm>({
		resolver: zodResolver(StreamerFormSchema),
	});

	async function onSubmit(data: StreamerForm) {
		try {
			const { id } = await streamersService.create({ streamerData: data });
			if (socket.connected) {
				socket.emit(EVENTS.STREAMER_ADDED, id);
			}
			toast.success("Added streamer");
		} catch (e) {
			console.error(e);
			if (
				e instanceof AxiosError &&
				e.response?.data &&
				isErrorResponse(e.response.data)
			) {
				toast.error(e.response?.data.error.message);
				console.error(e.response?.data.error.message);
			}
		}

		props.onSubmit();
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="dark:text-gray-200 dark:bg-gray-800"
		>
			<h3 className="pb-4 text-xl">Upload</h3>
			<p className="pb-2">Share your favourite streamer with others!</p>
			<div className="flex flex-col py-1">
				<label htmlFor="Name" className="pb-2">
					Name
				</label>
				<input
					id="name"
					className="inline-block text-black rounded-sm h-7 p-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
					{...register("name")}
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
					className="text-black rounded-sm h-7 pl-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
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
					className="text-black rounded-sm px-2 py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
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

export { StreamerForm };
