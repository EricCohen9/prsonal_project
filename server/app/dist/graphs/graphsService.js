var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllGraphsDal } from "./graphsDal.js";
export const getAllGraphsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const key = `getAllUser:getAllUsersService`;
        //   const dataFromRedis = await RedisClient.get(key);
        //   if (dataFromRedis) {
        //     console.log("Data retrieved from Redis");
        //     return JSON.parse(dataFromRedis);
        const users = yield getAllGraphsDal();
        //   await RedisClient.setEx(key, 200, JSON.stringify(users));
        //   console.log("Data stored in Redis");
        return users;
    }
    catch (arr) {
        console.error("Error get all users:(service)", arr);
        throw arr;
    }
});
//# sourceMappingURL=graphsService.js.map