var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./resolvers/resolvers.js";
import { checkConnection } from "./PostgreSQL/PostgreSQL.js";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
// import Redis from "ioredis";
import http from "http";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import chalk from "chalk";
import RedisClient from "./redis/redis.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
});
const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
            serverWillStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        drainServer() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield serverCleanup.dispose();
                            });
                        },
                    };
                });
            },
        },],
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    app.use("/graphql", cors(), express.json(), morgan("tiny"), expressMiddleware(server, {
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = req.headers.token;
            return { token };
        }),
    }));
    yield new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(chalk.blueBright(`🚀 Server ready at http://localhost:${PORT}/graphql`));
    yield checkConnection();
    RedisClient.connect()
        .then(() => console.log(chalk.magentaBright("Connected to Redis🚀🚀")))
        .catch((error) => {
        if (error instanceof Error)
            console.log(error.message);
    });
});
start();
//# sourceMappingURL=server.js.map