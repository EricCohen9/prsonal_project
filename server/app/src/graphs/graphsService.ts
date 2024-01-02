import { UserInterface } from "../interfaces/userInterface.js";
import { getAllGraphsDal } from "./graphsDal.js"; 
import { generateUserPassword } from "../bycrypt/bycrypt.js";
import { resolversinterface } from "../interfaces/resolverinterface.js";
import RedisClient from "../redis/redis.js";


export const getAllGraphsService = async () => {
    try {
    //   const key = `getAllUser:getAllUsersService`;
  
    //   const dataFromRedis = await RedisClient.get(key);
    //   if (dataFromRedis) {
    //     console.log("Data retrieved from Redis");
    //     return JSON.parse(dataFromRedis);
      
      const users = await getAllGraphsDal();
    //   await RedisClient.setEx(key, 200, JSON.stringify(users));
    //   console.log("Data stored in Redis");
  
      return users;
      
    } catch (arr) {
      console.error("Error get all users:(service)", arr);
      throw arr;
    }
  };