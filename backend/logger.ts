import winston, { transports } from "winston";

const { format } = winston;

const logFormatter = format.printf(({ level, message, timestamp }) => {
	return `[${timestamp}] [${level}] message: "${message}"`;
});

export const logger = winston.createLogger({
	format: format.combine(
		format.colorize({ level: true }),
		format.timestamp({ format: "YY-MM-DD HH:mm:ss" }),
		logFormatter
	),
	transports: [new transports.Console()],
});
