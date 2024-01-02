var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import { getAllOrders, updateByOrderId, addNewOrder, getOrdersByUserId, deleteByOrderId, getOrdersForHours } from "./orderDal.js";
import redisClient from "../redis/redis.js";
const ALL_ORDERS_CACHE_KEY = "allOrders";
const getUserOrdersCacheKey = (userId) => `ordersByUser:${userId}`;
const getFromCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield redisClient.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    }
    catch (error) {
        console.log(chalk.redBright(`Error retrieving data from cache (${key}):`, error));
        throw error;
    }
});
const setToCache = (key, data, ttlSeconds = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.set(key, JSON.stringify(data));
        yield redisClient.expire(key, ttlSeconds);
    }
    catch (error) {
        console.log(chalk.redBright(`Error setting data to cache (${key}):`, error));
        throw error;
    }
});
const clearAllOrdersCache = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.del(ALL_ORDERS_CACHE_KEY);
    }
    catch (error) {
        console.log(chalk.redBright("Error clearing all orders cache:", error));
        throw error;
    }
});
export const getAllOrdersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedOrders = yield getFromCache(ALL_ORDERS_CACHE_KEY);
        if (cachedOrders) {
            return cachedOrders;
        }
        const ordersFromDAL = yield getAllOrders();
        if (!Array.isArray(ordersFromDAL) || ordersFromDAL.length === 0) {
            throw new Error("No orders in the database");
        }
        const ordersData = ordersFromDAL.map(order => order.toObject());
        yield setToCache(ALL_ORDERS_CACHE_KEY, ordersData);
        return ordersData;
    }
    catch (error) {
        console.log(chalk.redBright("Error in getAllOrdersService:", error));
        throw error;
    }
});
export const updateByOrderIdService = (orderId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield clearAllOrdersCache();
        const updatedOrderFromDAL = yield updateByOrderId(orderId, updatedData);
        const key = `orders:${updatedOrderFromDAL.id}`;
        const dataFromRedis = yield redisClient.get(key);
        if (dataFromRedis) {
            console.log("Data retrieved from Redis");
            return JSON.parse(dataFromRedis);
        }
        yield redisClient.setEx(key, 200, JSON.stringify(updatedOrderFromDAL));
        return updatedOrderFromDAL;
    }
    catch (error) {
        console.log(chalk.redBright("Error in updateByOrderIdService:", error));
        throw error;
    }
});
export const addNewOrderService = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield clearAllOrdersCache();
        const newOrderFromDAL = yield addNewOrder(orderData);
        const key = `orders:${newOrderFromDAL.id}`;
        const dataFromRedis = yield redisClient.get(key);
        if (dataFromRedis) {
            console.log("Data retrieved from Redis");
            return JSON.parse(dataFromRedis);
        }
        yield redisClient.setEx(key, 200, JSON.stringify(newOrderFromDAL));
        return newOrderFromDAL;
    }
    catch (error) {
        console.log(chalk.redBright("Error in addNewOrderService:", error));
        throw error;
    }
});
export const getOrdersByUserIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = getUserOrdersCacheKey(userId);
        const cachedOrders = yield getFromCache(cacheKey);
        if (cachedOrders) {
            return cachedOrders;
        }
        const ordersByUserFromDAL = yield getOrdersByUserId(userId);
        const key = `orders:${userId}`;
        const dataFromRedis = yield redisClient.get(key);
        if (dataFromRedis) {
            console.log("Data retrieved from Redis");
            return JSON.parse(dataFromRedis);
        }
        yield redisClient.setEx(key, 200, JSON.stringify(ordersByUserFromDAL));
        if (!Array.isArray(ordersByUserFromDAL) || ordersByUserFromDAL.length === 0) {
            throw new Error("No orders found for the given user");
        }
        yield setToCache(cacheKey, ordersByUserFromDAL);
        return ordersByUserFromDAL;
    }
    catch (error) {
        console.log(chalk.redBright("Error in getOrdersByUserIdService:", error));
        throw error;
    }
});
export const deleteOrdersByOrderIdService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield clearAllOrdersCache();
        const deleteOrderFromDAL = yield deleteByOrderId(orderId);
        return deleteOrderFromDAL;
    }
    catch (error) {
        console.log(chalk.redBright("Error in deleteOrdersByOrderIdService:", error));
        throw error;
    }
});
export const getAllOrdersServiceStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersFromDAL = yield getAllOrders();
        if (ordersFromDAL instanceof Error) {
            throw ordersFromDAL;
        }
        const orderStatistics = {
            Pending: 0,
            Refunded: 0,
            Delivered: 0,
        };
        ordersFromDAL.forEach((orderDocument) => {
            const order = orderDocument.toObject();
            switch (order.status) {
                case "Pending":
                    orderStatistics.Pending += 1;
                    break;
                case "Refunded":
                    orderStatistics.Refunded += 1;
                    break;
                case "Delivered":
                    orderStatistics.Delivered += 1;
                    break;
                default:
                    break;
            }
        });
        return orderStatistics;
    }
    catch (error) {
        console.log(chalk.redBright(error));
        throw error;
    }
});
export const getOrdersForHoursService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderForHours = yield getOrdersForHours();
        return orderForHours;
    }
    catch (error) {
        console.log(chalk.redBright(error));
        throw error;
    }
});
//# sourceMappingURL=orderService.js.map