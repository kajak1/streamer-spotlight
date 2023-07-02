import { StreamersList } from "./StreamersList";
import { CreateStreamerButton } from "../components/CreateStreamerButton";
import { StreamerForm } from "./StreamerForm";
import { Modal } from "../components/Modal";
import { useModal } from "../hooks/useModal";

export default function Home() {
	const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

	return (
		<>
			<CreateStreamerButton onClick={handleOpenModal} />
			<StreamersList />
			<Modal
				isOpen={isModalOpen}
				shouldCloseOnEsc
				onRequestClose={handleCloseModal}
				shouldCloseOnOverlayClick
			>
				<div className="w-full sm:w-1/2 h-fit bg-slate-100 dark:bg-gray-900 p-4 rounded-md relative">
					<div className="w-full h-fit">
						<Modal.Close
							onClose={handleCloseModal}
							className="text-2xl dark:text-gray-200 absolute top-0 right-0 p-3"
						/>
					</div>
					<StreamerForm onSubmit={handleCloseModal} />
				</div>
			</Modal>
		</>
	);
}

