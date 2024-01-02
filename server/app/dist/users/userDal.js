var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pool from "../PostgreSQL/PostgreSQL.js";
import { comparePassword } from "../bycrypt/bycrypt.js";
export function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isadmin BOOLEAN DEFAULT false,
        resetcode VARCHAR (255),
        registration_time TIMESTAMP
        )
    `);
            console.log("Users table created or already exists.");
        }
        catch (error) {
            console.error("Error creating users table:", error.message);
        }
    });
}
export function registerDal(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const existingUserCheck = yield client.query("SELECT * FROM users WHERE email = $1", [user.email]);
            if (existingUserCheck.rows.length > 0) {
                throw new Error("User with this email already exists.");
            }
            const result = yield client.query("INSERT INTO users (email, password, isadmin) VALUES ($1, $2, $3) RETURNING *", [user.email, user.password, user.isadmin || false]);
            if (result.rows.length > 0) {
                const insertedUser = result.rows[0];
                const result1 = yield client.query(`
      SELECT * FROM login_logs
      `);
                if (result1.rows.length > 0) {
                    // console.log(result1.rows);
                }
                else {
                    // console.log("No login logs found.");
                }
                // console.log(result1);
                return insertedUser;
            }
            else {
                console.error("Error inserting user into the table.");
                return null;
            }
        }
        catch (error) {
            console.error("Error adding user to the table:", error.message);
            throw error;
        }
        finally {
            client.release();
        }
    });
}
export function forgotPasswordDal(email, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const result = yield client.query("UPDATE users SET resetcode = $1 WHERE email = $2 RETURNING *", [code, email]);
            if (result.rows.length > 0) {
                const insertedUser = result.rows[0];
                return insertedUser;
            }
            else {
                console.error("Error inserting user into the table.");
                return null;
            }
        }
        catch (error) {
            console.error("Error adding code to the table:", error.message);
            throw error;
        }
        finally {
            client.release();
        }
    });
}
export function comperepasswordDal(email, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query("SELECT resetcode FROM users WHERE email = $1", [email]);
            if (result.rows.length === 1) {
                const resetCodeFromDB = result.rows[0].resetcode;
                const isMatch = resetCodeFromDB === newPassword;
                if (isMatch) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        catch (error) {
            console.error("Error comparing passwords:", error);
            return false;
        }
    });
}
export function resetPasswordDal(email, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(newPassword, "new");
        const client = yield pool.connect();
        try {
            yield client.query("UPDATE users SET password = $1, resetcode = NULL WHERE email = $2", [newPassword, email]);
        }
        catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
        finally {
            client.release();
        }
    });
}
export function loginDal(userEmail, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const result = (yield client.query("SELECT * FROM users WHERE email = $1 ", [userEmail]));
            if (result.rows.length > 0) {
                const userById = result.rows[0];
                console.log("user");
                if (comparePassword(userPassword, userById.password)) {
                    console.log(userById);
                    return userById;
                }
            }
            else {
                console.error("Incorrect email or password");
                return null;
            }
        }
        catch (error) {
            console.error("Error getting user by ID:", error.message);
            return null;
        }
        finally {
            client.release();
        }
    });
}
export const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const { rows: user } = yield client.query("SELECT * FROM users WHERE id=$1", [userId]);
        return user;
    }
    catch (error) {
        console.error("Error executing SQL query:", error);
    }
    finally {
        client.release();
    }
});
export const getAllUsersDal = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const result = yield client.query("SELECT * FROM users");
        return result.rows;
    }
    catch (error) {
        console.error("Error executing SQL query:", error);
    }
    finally {
        client.release();
    }
});
export const deleteUserByIdDal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    console.log(id);
    try {
        const deleteUser = yield client.query("DELETE FROM users WHERE id = $1", [
            id,
        ]);
        console.log(`User with id ${id} has been deleted.`);
        if (deleteUser.rowCount === 0) {
            console.log(`Order with ID ${id} not found`);
            throw new Error(`Order with ID ${id} not found!`);
        }
    }
    catch (error) {
        console.error("Error deleting user:", error.message);
        throw error;
    }
    finally {
        client.release();
    }
});
// createUsersTable();
function createLoginTrigger() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            yield client.query("BEGIN");
            yield pool.query(`
      CREATE TABLE IF NOT EXISTS login_logs (
        log_id SERIAL PRIMARY KEY,
        user_id INTEGER,
        login_time TIMESTAMP
      );
    `);
            yield pool.query(`
      CREATE  FUNCTION log_user_login()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO login_logs (user_id, login_time) 
        VALUES (NEW.id, CURRENT_TIMESTAMP);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
            const result = yield pool.query(`
    SELECT *
    FROM information_schema.triggers
    WHERE trigger_name = 'user_login_trigger'
  `);
            if (result.rowCount === 0) {
                yield pool.query(`
      CREATE TRIGGER user_login_trigger
      AFTER INSERT 
      ON users
      FOR EACH ROW
      EXECUTE PROCEDURE log_user_login();
    `);
            }
            yield client.query("COMMIT");
        }
        catch (eror) {
            yield client.query("ROLLBACK");
            throw eror;
        }
        finally {
            client.release();
        }
    });
}
// createLoginTrigger();
export const getTimeRegisterDal = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const result = yield client.query(`
      SELECT EXTRACT(HOUR FROM login_time) AS hour, COUNT(*) AS registrations
      FROM login_logs
      GROUP BY hour
      ORDER BY hour;
    `);
        // console.log(result.rows);
        const countHours = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];
        result.rows.forEach((entry) => {
            const hour = Number(entry.hour);
            const registrations = Number(entry.registrations);
            countHours[hour] += registrations;
        });
        // console.log(countHours);
        return countHours;
    }
    catch (error) {
        console.error("Error executing SQL query:", error);
    }
    finally {
        client.release();
    }
});
//# sourceMappingURL=userDal.js.map