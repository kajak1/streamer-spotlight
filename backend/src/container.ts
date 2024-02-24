import { Express } from "express";
import http from "http";
import { DependencyContainer, container, instancePerContainerCachingFactory } from "tsyringe";
import { Logger } from "winston";
import { createExpressApp } from "./httpServer";
import { createWebsocketServer } from "./websocketServer";
import { createLogger } from "./logger";

export function registerDependencies() {
	container.register<Logger>("Logger", {
		useValue: createLogger(),
	});

	container.register<Express>("App", {
		useValue: createExpressApp(),
	});

	container.register<http.Server>("HttpServer", {
		useFactory: instancePerContainerCachingFactory((dc: DependencyContainer) => {
			const app = dc.resolve<Express>("App");
			return http.createServer(app);
		}),
	});

	container.register("WebsocketServer", {
		useFactory: instancePerContainerCachingFactory((dc: DependencyContainer) => {
			const httpServer = dc.resolve<http.Server>("HttpServer");
			return createWebsocketServer(httpServer);
		}),
	});
}
