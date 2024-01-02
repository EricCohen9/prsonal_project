import express from "express";
// import { checkingProductQuantity } from "../checkingProductQuantity/checkingProductQuantity.js";
import { verifyToken } from "../jwt/jwt.js";
import { handleGetAllOrders, handleUpdateByOrderId, handleGetOrdersByUserId, handleDeleteOrdersByOrderId, getOrdersForHoursController } from "./orderController.js";
const orderRouter = express.Router();
orderRouter.get("/", verifyToken, handleGetAllOrders);
orderRouter.put("/:orderId", handleUpdateByOrderId);
// orderRouter.post("/",checkingProductQuantity, handleAddNewOrder);
orderRouter.get("/:userId", handleGetOrdersByUserId);
orderRouter.get("/get/ordersForHours", getOrdersForHoursController);
orderRouter.delete("/:orderId", handleDeleteOrdersByOrderId);
export default orderRouter;
//# sourceMappingURL=orderRoutes.js.map