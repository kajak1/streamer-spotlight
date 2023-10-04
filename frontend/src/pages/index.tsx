import { GetServerSideProps } from "next";
import { CreateStreamerButton } from "../components/CreateStreamerButton/CreateStreamerButton";
import { Modal } from "../components/Modal";
import { StreamerForm } from "../components/StreamerForm";
import { StreamerList } from "../components/StreamerList";
import { StreamerListItems } from "../components/StreamerListItems";
import { useModal } from "../hooks/use-modal";
import { usersService } from "../services/users.service";
import { isAxiosError } from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const sendWithCookies = usersService.attachCookiesOnce_SSR(usersService.getData);
		console.log(ctx.req.cookies);
		const user = await sendWithCookies(ctx.req.cookies, "/users/me");

		if (!user) {
			return {
				redirect: {
					destination: "/login",
					permanent: false,
				},
			};
		}

		return {
			props: {},
		};
	} catch (e) {
		if (isAxiosError(e)) {
			console.log("Home.getServerSideProps()", e.response?.data);
		} else {
			console.log("Home.getServerSideProps()", e);
		}
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
};

export default function Home() {
	const { isOpen, handleOpenModal, handleCloseModal } = useModal();

	return (
		<>
			<CreateStreamerButton onClick={handleOpenModal} />
			<StreamerList>
				<StreamerListItems />
			</StreamerList>
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

