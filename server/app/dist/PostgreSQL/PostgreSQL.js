var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pkg from 'pg';
const { Pool } = pkg;
// import { Pool } from "pg";
import * as dotenv from 'dotenv';
// const pgp = require('pg-promise')();
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_USERNAME,
    ssl: {
        rejectUnauthorized: false,
    },
});
export function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield pool.connect();
            console.log("conenct to PostgreSQL");
        }
        catch (error) {
            console.error("Error connecting to PostgreSQL:", error.message);
        }
        finally {
            if (client) {
                client.release();
            }
        }
    });
}
export default pool;
//# sourceMappingURL=PostgreSQL.js.map