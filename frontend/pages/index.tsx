import { Header } from "./Header";
import { StreamersList } from "./StreamersList";
import { CreateStreamerButton } from "./CreateStreamerButton";
import { useState } from "react";
import { StreamerForm } from "./StreamerForm";
import { Modal } from "./components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data, isLoading, error } = useSWR(
		"http://localhost:3001/streamers",
		fetcher
	);

	if (error) return "An error has occurred.";
	if (isLoading) return "Loading...";

	console.log("data:", data);

	function handleCreateStreamer() {
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
	}

	return (
		<main className="flex flex-col items-center min-h-screen px-2 sm:px-36 md:px-48 lg:px-64 xl:px-96">
			<Header />
			<CreateStreamerButton onClick={handleCreateStreamer} />
			<article className="w-full py-8">
				<h2 className="text-xl">Streamers:</h2>
				<StreamersList />
			</article>
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

