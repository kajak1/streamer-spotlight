import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

type Props = React.ComponentProps<typeof ReactModal>;

function Modal({ children, ...rest }: Props) {
	return (
		<ReactModal
			className="h-full w-full lg:aspect-square lg:w-3/6 lg:h-auto p-4 grid place-items-center"
			overlayClassName="fixed inset-0 bg-slate-400/50 grid place-items-center"
			{...rest}
		>
			{children}
		</ReactModal>
	);
}

export { Modal };
