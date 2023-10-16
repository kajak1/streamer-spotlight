import { Request, Response } from "express";
import { ApplicationError } from "../errors/ApplicationError";
import { usersRepository } from "../repositories/users.repostitory";
import { UsersService, usersService } from "../services/users.service";
import { GetSpecificParams } from "../shared.types";

class UsersController {
	constructor(private usersService: UsersService) {}

	getUsers = async (req: Request, res: Response): Promise<void> => {
		const users = await usersRepository.findAll();

		if (!users) throw new ApplicationError("NOT_FOUND");

		res.status(200).json(users);
	};

	getData = async (req: Request, res: Response): Promise<void> => {
		const userId = await this.usersService.getUserIdFromSession(req.cookies);

		const userData = await usersRepository.find({ id: userId });

		res.status(200).json(userData);
	};

	throwError = () => {
		throw new ApplicationError("UNKNOWN_ERROR");
	};

	getAllVotes = async (req: Request, res: Response) => {
		const userId = await this.usersService.getUserIdFromSession(req.cookies);
		if (!userId) throw new ApplicationError("UNAUTHORIZED");

		const castedVotes = await usersRepository.getVotes(userId);

		if (!castedVotes) res.status(500);

		res.status(200).json(castedVotes);
	};

	getVotesOnStreamer = async (req: Request<GetSpecificParams>, res: Response) => {
		const { streamerId } = req.params;

		const userId = await this.usersService.getUserIdFromSession(req.cookies);

		const { didUpvote, didDownvote } = await this.usersService.getVotesOnStreamer(userId, streamerId);

		const castedVotes = {
			didUpvote: didUpvote,
			didDownvote: didDownvote,
		};

		res.status(200).json(castedVotes);
	};
}

export const usersController = new UsersController(usersService);
