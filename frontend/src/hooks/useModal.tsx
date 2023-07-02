import { useState } from "react";

function useModal(initialOpen: boolean = false) {
	const [isModalOpen, setIsModalOpen] = useState(initialOpen);

	function handleOpen() {
		setIsModalOpen(true);
	}

	function handleClose() {
		setIsModalOpen(false);
	}

	return {
		isModalOpen,
		handleOpenModal: handleOpen,
		handleCloseModal: handleClose,
	};
}

export { useModal };
