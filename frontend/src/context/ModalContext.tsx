import { createContext } from "react";

interface ModalContext {
	handleClose: () => void;
}

export const ModalContext = createContext<ModalContext>({
	handleClose: () => {
		// do nothing
	},
});
