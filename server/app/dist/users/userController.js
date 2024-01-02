var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { registerService, loginService, forgotPasswordService, resetPasswordService, deleteUserByIdService, getAllUsersService, comperepasswordService, getTimeRegisterService, } from "./userService.js";
import { generateUserPassword } from "../bycrypt/bycrypt.js";
import * as JWT from "../jwt/jwt.js";
import { generateUniqueCode } from "../nodemailer/nodemailer.js";
import { sendemail } from "../nodemailer/nodemailer.js";
export const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerUser = req.body;
        registerUser.password = generateUserPassword(registerUser.password);
        const user = yield registerService(registerUser);
        if (user) {
            const accessToken = JWT.generateAccessToken(user);
            return res.status(200).json({
                users: user,
                accessToken: accessToken,
            });
        }
        else {
            return res.status(404).json({ message: "No Users found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while retrieving users" });
    }
});
export const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailToReset = req.body.email;
    console.log(emailToReset, "emailtoreset");
    const code = generateUniqueCode();
    try {
        sendemail(emailToReset, code);
        const result = forgotPasswordService(emailToReset, code);
        res.send("Email sent with instructions to reset your password.");
    }
    catch (error) {
        console.error("Error sending email", error);
        res.status(500).send("Internal Server Error");
    }
});
export const comperepassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailToReset = req.body.email;
    const code = req.body.code;
    try {
        const result = comperepasswordService(emailToReset, code);
        res.send("sucsess");
    }
    catch (error) {
        console.error("Error ", error);
        res.status(500).send("Internal Server Error");
    }
});
export const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield resetPasswordService(email, password);
        res
            .status(200)
            .json({ success: true, message: "Password reset successful" });
    }
    catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
export const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logInUser = req.body;
        console.log(logInUser);
        const user = yield loginService(logInUser);
        console.log(user);
        if (user) {
            const accessToken = JWT.generateAccessToken(user);
            console.log(accessToken);
            return res.status(200).json({ users: user, accessToken: accessToken });
        }
        return res.status(404).json({ message: "Incorrect email or password" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error while retrieving users" });
    }
    return res.status(404).json({ message: "Incorrect email or password" });
});
export const deleteUserByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deleteUserId = yield deleteUserByIdService(Number(userId));
        console.log((deleteUserId));
        res.send({ message: `${deleteUserId}user deleted successfully` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error while delete user" });
    }
});
export const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield getAllUsersService();
        res.status(200).json(allUsers);
    }
    catch (error) {
        res.status(500).json({ error: "Server error while get all users" });
    }
});
export const getTimeRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield getTimeRegisterService();
        res.status(200).json(allUsers);
    }
    catch (error) {
        res.status(500).json({ error: "Server error while get all users" });
    }
});
//# sourceMappingURL=userController.js.map