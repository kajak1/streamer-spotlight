import { isErrorResponse } from "@/src/services/service.helpers";
import { streamersService } from "@/src/services/streamers.service";
import { StreamerForm, StreamerFormSchema } from "@/src/shared.types";
import { socket } from "@/src/socket";
import { EVENTS } from "@/src/websocket.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
	onSubmit: () => void;
}

function useStreamerForm(props: Props) {
	const formHelpers = useForm<StreamerForm>({
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

	return {
		...formHelpers,
		handleSubmit: formHelpers.handleSubmit(onSubmit),
	};
}

export { useStreamerForm };
