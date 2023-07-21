import { useCallback, useContext, useState } from "react";

function useModal() {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	return {
		isOpen,
		handleOpenModal,
		handleCloseModal,
	};
}

export { useModal };
