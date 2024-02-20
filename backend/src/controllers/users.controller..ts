import { Request, Response } from "express";
import { HttpError } from "../errors/ApplicationError";
import { UsersService } from "../services/users.service";
import { GetSpecificParams } from "../shared.types";
import { UsersRepository } from "../repositories/users.repostitory";
import { injectable } from "tsyringe";

@injectable()
export class UsersController {
	constructor(private usersService: UsersService, private usersRepository: UsersRepository) {}

	getUsers = async (req: Request, res: Response): Promise<void> => {
		const users = await this.usersRepository.findAll();

		if (!users) throw new HttpError("NOT_FOUND");

		res.status(200).json(users);
	};

	getData = async (req: Request, res: Response): Promise<void> => {
		const userId = await this.usersService.getUserIdFromSession(req.cookies);

		const userData = await this.usersRepository.find({ id: userId });

		res.status(200).json(userData);
	};

	throwError = () => {
		throw new HttpError("UNKNOWN_ERROR");
	};

	getAllVotes = async (req: Request, res: Response) => {
		const userId = await this.usersService.getUserIdFromSession(req.cookies);
		if (!userId) throw new HttpError("UNAUTHORIZED");

		const castedVotes = await this.usersRepository.getVotes(userId);

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