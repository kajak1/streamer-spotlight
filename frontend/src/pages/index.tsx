import { CreateStreamerButton } from "../components/CreateStreamerButton/CreateStreamerButton";
import { Modal } from "../components/Modal";
import { StreamerForm } from "../components/StreamerForm";
import { StreamerList } from "../components/StreamerList";
import { StreamerListItems } from "../components/StreamerListItems";
import { useModal } from "../hooks/use-modal";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	try {
// 		// console.time("SSR Home() time");
// 		const sendWithCookies = usersService.attachCookiesOnce_SSR(usersService.getData);
// 		console.log(ctx.req.cookies);
// 		// console.timeLog("SSR Home() time")
// 		console.log("send");
// 		const user = await sendWithCookies(ctx.req.cookies, "/users/me");
// 		console.log("receive");
// 		// console.timeEnd("SSR Home() time")

// 		if (!user) {
// 			return {
// 				redirect: {
// 					destination: "/login",
// 					permanent: false,
// 				},
// 			};
// 		}

// 		return {
// 			props: {},
// 		};
// 	} catch (e) {
// 		console.log("catched");
// 		// if (isAxiosError(e)) {
// 		// 	console.log("Home.getServerSideProps() axios", e);
// 		// } else {
// 		// 	console.log("Home.getServerSideProps()", e);
// 		// }
// 		return {
// 			redirect: {
// 				destination: "/login",
// 				permanent: false,
// 			},
// 		};
// 	}
// };

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

