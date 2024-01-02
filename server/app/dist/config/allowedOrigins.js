import * as dotenv from 'dotenv';
dotenv.config;
const FRONT = process.env.BASE_URL_FRONT;
const STORE = process.env.BASE_URL_STORE;
export const allowedOrigins = [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    FRONT,
    STORE
];
//# sourceMappingURL=allowedOrigins.js.map