import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined;
const RedisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: redisPort
    }
});
export default RedisClient;
//# sourceMappingURL=redis.js.map