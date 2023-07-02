import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

type Props = React.ComponentProps<typeof ReactModal>;

interface CloseProps {
	onClose: () => void;
	className: HTMLAttributes<HTMLButtonElement>["className"];
}

function Close({ onClose, className }: CloseProps): JSX.Element {
	return (
		<button className={className} onClick={onClose}>
			<FontAwesomeIcon icon={faXmark} />
		</button>
	);
}

function Modal({ children, ...rest }: Props) {
	return (
		<ReactModal
			className="w-full lg:aspect-square lg:w-3/6 lg:h-auto p-4 grid place-items-center "
			overlayClassName="fixed inset-0 bg-gray-500/50 dark:bg-gray-900/50 grid place-items-center "
			{...rest}
		>
			{children}
		</ReactModal>
	);
}

Modal.Close = Close;

export { Modal };
