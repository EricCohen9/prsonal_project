import express from "express";
import { registerController, loginController, deleteUserByUserId, forgotPassword, resetPassword, getAllUsersController, comperepassword, } from "./userController.js";
import { validateUser } from "../validation/validation.js";
import { limiter } from "../rateLimiter/rateLimiter.js";
import { verifyToken } from "../jwt/jwt.js";
export const userRouter = express.Router();
userRouter.get("/", verifyToken, getAllUsersController);
userRouter.post("/register", validateUser, registerController);
userRouter.post("/login", limiter, validateUser, loginController);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/comparepassword", comperepassword);
userRouter.post("/resetpaasword", resetPassword);
userRouter.delete("/:userId", deleteUserByUserId);
export default userRouter;
//# sourceMappingURL=usersRoutes.js.map