var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Types } from "mongoose";
import { getAllOrdersService, getOrdersByUserIdService, updateByOrderIdService, addNewOrderService, deleteOrdersByOrderIdService, getAllOrdersServiceStatus, getOrdersForHoursService } from "../orders/orderService.js";
import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();
export const orderResolvers = {
    getAllOrders: () => getAllOrdersService(),
    getOrdersByUserId: (_, { userId }) => getOrdersByUserIdService(userId),
    updateOrder: (_, { orderId, updatedData }) => updateByOrderIdService(new Types.ObjectId(orderId), updatedData),
    addNewOrder: (_, { orderData }) => {
        try {
            const newOrder = addNewOrderService(orderData);
            pubsub.publish("ORDERS_FOR_HOURS", {
                getOrdersForHours: getOrdersForHoursService,
            });
            return newOrder;
        }
        catch (error) {
            throw new Error("Could not adding order");
        }
    },
    deleteOrder: (_, { orderId }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = orderId;
        try {
            const order = yield deleteOrdersByOrderIdService(id);
            return `delete order successfully`;
        }
        catch (error) {
            console.error("Error deleting order:", error);
            throw new Error("Could not delete order");
        }
    }),
    handleGetAllOrdersStatus: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield getAllOrdersServiceStatus();
            return orders;
        }
        catch (error) {
            console.error("Error deleting order:", error);
            throw new Error("Could not delete order");
        }
    }),
    // getOrdersForHours: async () => {
    //   try{
    //     const orders = await getOrdersForHoursService();
    //     return orders;
    //   }catch (error){
    //     throw new Error("Could not get order")
    //   }
    // }
    getOrdersForHours: {
        subscribe: () => __awaiter(void 0, void 0, void 0, function* () {
            return pubsub.asyncIterator(["ORDERS_FOR_HOURS"]);
        })
    }
};
//# sourceMappingURL=orderResolvers.js.map