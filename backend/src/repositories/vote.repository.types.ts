import { Upvote, Downvote, Prisma } from "@prisma/client";

export interface VoteRepository<T extends Upvote | Downvote> {
	findAll: () => Promise<T[]>;
	findUnique: (
		args: T extends Upvote ? Prisma.UpvoteFindUniqueArgs : Prisma.DownvoteFindUniqueArgs
	) => Promise<T | null>;
	insert: (args: Pick<T, "streamerId" | "userId">) => Promise<T>;
	delete: (args: T extends Upvote ? Prisma.UpvoteWhereUniqueInput : Prisma.DownvoteWhereUniqueInput) => Promise<string>;
}
