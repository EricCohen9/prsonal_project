var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Types } from 'mongoose';
import { getAllOrdersService, updateByOrderIdService, addNewOrderService, getOrdersByUserIdService, deleteOrdersByOrderIdService, getOrdersForHoursService } from './orderService.js';
import { handleError } from '../utils/handleErrors.js';
export const handleGetAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield getAllOrdersService();
        res.send(orders);
    }
    catch (error) {
        handleError(res, error);
    }
});
export const handleUpdateByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = new Types.ObjectId(req.params.orderId);
        const updatedData = req.body;
        const updatedOrder = yield updateByOrderIdService(orderId, updatedData);
        res.send(updatedOrder);
    }
    catch (error) {
        handleError(res, error);
    }
});
export const handleAddNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const newOrder = yield addNewOrderService(orderData);
        res.json({ newOrder: newOrder, productNotFound: res.locals.productNotFound });
    }
    catch (error) {
        handleError(res, error);
    }
});
export const handleGetOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const ordersByUser = yield getOrdersByUserIdService(userId);
        res.send(ordersByUser);
    }
    catch (error) {
        handleError(res, error);
    }
});
export const handleDeleteOrdersByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const ordersByUser = yield deleteOrdersByOrderIdService(orderId);
        res.send({ message: 'Order deleted successfully' });
    }
    catch (error) {
        handleError(res, error);
    }
});
export const getOrdersForHoursController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersForHours = yield getOrdersForHoursService();
        res.send(ordersForHours);
    }
    catch (error) {
        handleError(res, error);
    }
});
//# sourceMappingURL=orderController.js.map