var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleDBResponseError } from "../utils/handleErrors.js";
import { OrderModel, OrderForHoursModel } from "../mongoDB/Schemas/order.js";
export const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("db");
        const orders = yield OrderModel.find({});
        return orders;
    }
    catch (error) {
        return handleDBResponseError(error);
    }
});
export const updateByOrderId = (orderId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield OrderModel.findByIdAndUpdate(orderId, updatedData, { new: true });
        if (!updatedOrder)
            throw new Error('Order not found!');
        return updatedOrder;
    }
    catch (error) {
        return handleDBResponseError(error);
    }
});
export const addNewOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = new OrderModel({
            cartItems: orderData.cartItems,
            orderTime: orderData.orderTime,
            status: orderData.status,
            price: orderData.price,
            shippingDetails: orderData.shippingDetails,
        });
        newOrder.isNew = true;
        yield newOrder.save();
        return newOrder;
    }
    catch (error) {
        return handleDBResponseError(error);
    }
});
export const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrderModel.find({ "shippingDetails.userId": userId });
        return orders;
    }
    catch (error) {
        return handleDBResponseError(error);
    }
});
export const deleteByOrderId = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderDelete = yield OrderModel.findOneAndDelete({ _id: orderId });
        if (!orderDelete) {
            console.log(`Order with ID ${orderId} not found`);
            throw new Error(`Order with ID ${orderId} not found!`);
        }
        return "delete successful";
    }
    catch (error) {
        return handleDBResponseError(error);
    }
});
export const getOrdersForHours = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OrdersForHours = yield OrderForHoursModel.find({});
        const countHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        OrdersForHours.map((Order) => {
            const date = new Date(Order.time);
            countHours[date.getHours()]++;
        });
        return countHours;
    }
    catch (error) {
        return handleDBResponseError(error);
    }
});
//# sourceMappingURL=orderDal.js.map