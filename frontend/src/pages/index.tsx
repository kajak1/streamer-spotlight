import { CreateStreamerButton } from "../components/CreateStreamerButton/CreateStreamerButton";
import { Modal } from "../components/Modal/Modal";
import { StreamerForm } from "../components/StreamerForm";
import { StreamersList } from "../components/StreamersList";
import { useModal } from "../hooks/use-modal";

export default function Home() {
	const { isOpen, handleOpenModal, handleCloseModal } = useModal();

	return (
		<>
			<CreateStreamerButton onClick={handleOpenModal} />
			<StreamersList />
			<Modal
				isOpen={isOpen}
				onHide={handleCloseModal}
				onRequestClose={handleCloseModal}
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
			>
				<div className="w-full sm:w-1/2 h-fit bg-slate-100 dark:bg-gray-800 p-4 rounded-md relative">
					<div className="w-full h-fit">
						<Modal.Close className="text-2xl dark:text-gray-200 absolute top-0 right-0 p-3" />
					</div>
					<StreamerForm onSubmit={handleCloseModal} />
				</div>
			</Modal>
		</>
	);
}

