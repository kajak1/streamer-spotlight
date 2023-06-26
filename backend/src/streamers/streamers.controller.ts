import { Request, Response } from "express";
import { streamersRepository } from "./streamers.repository";

class StreamersController {
	constructor() {
		// placeholder
	}

	getAll(req: Request, res: Response) {
		streamersRepository.findAll();
		res.json({ msg: "working" });
	}

	getSpecific() {
		streamersRepository.findOne();
	}

	upload() {
		streamersRepository.insert();
	}

	vote() {
		streamersRepository.modify();
	}
}

export const streamersController = new StreamersController();
