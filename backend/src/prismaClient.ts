import { PrismaClient } from "@prisma/client";
import { createNamespace } from "cls-hooked";

const prisma = new PrismaClient();

export const transactionContext = createNamespace<{ client: TransactionClient }>("vote-transaction");

export const createTransaction = async (fn: (...args: any[]) => Promise<unknown>) =>
	await prisma.$transaction(async (tx) => {
		await transactionContext.runPromise(async () => {
			transactionContext.set("client", tx);
			await fn();
		});
	});

export const getPrismaClient = () => {
	return (transactionContext.get("client") as TransactionClient) ?? prisma;
};

export type TransactionClient = Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0];
