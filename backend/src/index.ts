import { createServer } from "./server";

const PORT = 3001;
const HOST = "0.0.0.0";

const app = createServer();

app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});
