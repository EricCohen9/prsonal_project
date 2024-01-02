var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loginDal, registerDal, deleteUserByIdDal, forgotPasswordDal, resetPasswordDal, getAllUsersDal, comperepasswordDal, getTimeRegisterDal, } from "../users/userDal.js";
import { generateUserPassword } from "../bycrypt/bycrypt.js";
import RedisClient from "../redis/redis.js";
export const registerService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const key = `usersRegister:${user.email}`;
        // const dataFromRedis = await RedisClient.get(key);
        // if (dataFromRedis) {
        //   console.log("Data retrieved from Redis");
        //   return JSON.parse(dataFromRedis);
        const result = yield registerDal(user);
        // await RedisClient.setEx(key, 200, JSON.stringify(result));
        // console.log("Data stored in Redis");
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
});
export const forgotPasswordService = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield forgotPasswordDal(email, code);
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
});
export const comperepasswordService = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comperepasswordDal(email, code);
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
});
export const resetPasswordService = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPasswordBycrypt = generateUserPassword(newPassword);
        const result = yield resetPasswordDal(email, newPasswordBycrypt);
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
});
export const loginService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = `loginService:${user.email}`;
        const dataFromRedis = yield RedisClient.get(key);
        if (dataFromRedis) {
            console.log("Data retrieved from Redis");
            return JSON.parse(dataFromRedis);
        }
        const result = yield loginDal(user.email, user.password);
        yield RedisClient.setEx(key, 200, JSON.stringify(result));
        console.log("Data stored in Redis");
        return result;
    }
    catch (err) {
        console.error("Error reading data:(service)", err);
        throw err;
    }
});
export const deleteUserByIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUser = yield deleteUserByIdDal(userId);
        return deleteUser;
    }
    catch (arr) {
        console.error("Error delete user:(service)", arr);
        throw arr;
    }
});
export const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = `getAllUser:getAllUsersService`;
        const dataFromRedis = yield RedisClient.get(key);
        if (dataFromRedis) {
            console.log("Data retrieved from Redis");
            return JSON.parse(dataFromRedis);
        }
        const users = yield getAllUsersDal();
        yield RedisClient.setEx(key, 200, JSON.stringify(users));
        console.log("Data stored in Redis");
        return users;
    }
    catch (arr) {
        console.error("Error get all users:(service)", arr);
        throw arr;
    }
});
export const getTimeRegisterService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrations = yield getTimeRegisterDal();
        return registrations;
    }
    catch (error) {
        console.error("Error in getTimeRegisterController:", error);
        throw error;
    }
});
//# sourceMappingURL=userService.js.map