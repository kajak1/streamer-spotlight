import express from "express";
import cors from "cors";

const PORT = 3001;
const HOST = "0.0.0.0";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/test", (req, res) => {
	res.json({ msg: "test" });
});

app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});
