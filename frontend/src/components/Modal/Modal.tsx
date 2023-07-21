import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes, useContext, useMemo } from "react";
import ReactModal from "react-modal";
import { ModalContext } from "../../context/ModalContext";

ReactModal.setAppElement("#__next");

type Props = React.ComponentProps<typeof ReactModal> & {
	onHide: () => void;
};
interface CloseProps {
	className: HTMLAttributes<HTMLButtonElement>["className"];
}

function Close({ className }: CloseProps): JSX.Element {
	const { handleClose } = useContext(ModalContext);

	return (
		<button className={className} onClick={handleClose}>
			<FontAwesomeIcon icon={faXmark} />
		</button>
	);
}

function Modal({ isOpen, onHide, children, ...rest }: Props) {
	const contextValue = useMemo(() => {
		return {
			handleClose: onHide,
		};
	}, [onHide]);

	return (
		<ReactModal
			{...rest}
			isOpen={isOpen}
			className="w-full lg:aspect-square lg:w-3/6 lg:h-auto p-4 grid place-items-center"
			overlayClassName="fixed inset-0 grid place-items-center bg-gray-500/50 dark:bg-gray-900/50 "
		>
			<ModalContext.Provider value={contextValue}>
				{children}
			</ModalContext.Provider>
		</ReactModal>
	);
}

Modal.Close = Close;

export { Modal };
