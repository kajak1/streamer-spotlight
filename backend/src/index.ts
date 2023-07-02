import { createServer } from "./server";
import { createSocketServer } from "./socket";

const PORT = 3001;
const HOST = "0.0.0.0";

const app = createServer();

const server = app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});

export const io = createSocketServer(server);
