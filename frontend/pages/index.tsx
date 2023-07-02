import { Header } from "./Header";
import { StreamersList } from "./StreamersList";
import { CreateStreamerButton } from "./CreateStreamerButton";
import { useEffect, useState } from "react";
import { StreamerForm } from "./StreamerForm";
import { Modal } from "./components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR, { mutate } from "swr";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { StreamerCard } from "./StreamerCard";
import { streamersService } from "../services/streamersService";
import { io } from "socket.io-client";

export interface Streamer {
	id: string;
	name: string;
	description: string;
	platform: string;
	upvotes: number;
	downvotes: number;
}

export const SOCKET_EVENTS = {
	CONNECTION: "connection",
	DISCONNECT: "disconnect",
	STREAMER_ADDED: "streamer added",
	VOTE: "vote",
} as const;

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data, isLoading, error } = useSWR<Streamer[]>(
		"all",
		streamersService.getAll
	);

	useEffect(() => {
		const socket = io("http://localhost:3001");

		socket.on(SOCKET_EVENTS.STREAMER_ADDED, (newStreamer) => {
			mutate("all", data ? [...data, newStreamer] : [newStreamer]);
		});

		socket.on(
			SOCKET_EVENTS.VOTE,
			(updated: { id: string; upvotes: number; downvotes: number }) => {
				const newStreamers = data?.map((streamer) => {
					if (streamer.id === updated.id) {
						streamer.upvotes = updated.upvotes;
						streamer.downvotes = updated.downvotes;
					} else {
						return streamer;
					}
				});

				mutate("all", newStreamers);
			}
		);

		return () => {
			socket.disconnect();
		};
	}, [data]);

	if (error) {
		console.error(error);
	}
	if (error) return "An error has occurred.";
	if (isLoading) return "Loading...";
	if (!data) return "data empty";

	function handleCreateStreamer() {
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
	}

	const areStreamersEmpty = data.length === 0;

	return (
		<main className="flex flex-col items-center min-h-screen px-2 sm:px-36 md:px-48 lg:px-64 xl:px-96">
			<Header />
			<CreateStreamerButton onClick={handleCreateStreamer} />
			<StreamersList>
				{!areStreamersEmpty ? (
					data.map((streamer) => {
						return (
							<li key={streamer.id}>
								<StreamerCard
									id={streamer.id}
									name={streamer.name}
									downvotes={streamer.downvotes}
									upvotes={streamer.upvotes}
								/>
							</li>
						);
					})
				) : (
					<div className="w-full text-md text-center">Nothing added yet</div>
				)}
			</StreamersList>
			<Modal isOpen={isModalOpen}>
				<div className="w-full h-fit bg-sky-950 p-4">
					<button className="text-2xl" onClick={handleCloseModal}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
					<StreamerForm />
				</div>
			</Modal>
		</main>
	);
}

