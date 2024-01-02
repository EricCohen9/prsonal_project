var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// userResolvers.ts
import { PubSub } from "graphql-subscriptions";
import { registerService, loginService, forgotPasswordService, resetPasswordService, deleteUserByIdService, getAllUsersService, comperepasswordService, getTimeRegisterService, } from "./userService.js";
import * as JWT from "../jwt/jwt.js";
import { generateUniqueCode } from "../nodemailer/nodemailer.js";
import { generateUserPassword } from "../bycrypt/bycrypt.js";
import { sendemail } from "../nodemailer/nodemailer.js";
const pubsub = new PubSub();
let flag = true;
export const userResolvers = {
    registerUser: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Received mutation with email:", args.email, "and password:", args.password);
        try {
            const registerUser = args;
            console.log(registerUser.password, "register");
            registerUser.password = generateUserPassword(registerUser.password);
            const user = yield registerService(registerUser);
            if (user) {
                pubsub.publish("TIME_REGISTER_CHANNEL", {
                    getTimeRegister: getTimeRegisterService,
                });
                const accessToken = JWT.generateAccessToken(user);
                return { user, accessToken };
            }
            else {
                throw new Error("No Users found");
            }
        }
        catch (error) {
            console.error(error);
            throw new Error("Server error while registering user");
        }
    }),
    forgotPassword: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        const emailToReset = args.email;
        console.log(emailToReset, "emailtoreset");
        const code = generateUniqueCode();
        try {
            sendemail(emailToReset, code);
            const result = forgotPasswordService(emailToReset, code);
            return "Email sent with instructions to reset your password.";
        }
        catch (error) {
            console.error("Error sending email", error);
            throw new Error("Internal Server Error");
        }
    }),
    comperepassword: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        const emailToReset = args.email;
        const code = args.code;
        try {
            const result = comperepasswordService(emailToReset, code);
            return "Success";
        }
        catch (error) {
            console.error("Error ", error);
            throw new Error("Internal Server Error");
        }
    }),
    resetPassword: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = args;
            const result = yield resetPasswordService(email, password);
            return { success: true, message: "Password reset successful" };
        }
        catch (error) {
            console.error("Error resetting password:", error);
            throw new Error("Internal Server Error");
        }
    }),
    login: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const logInUser = args;
            const user = yield loginService(logInUser);
            if (user) {
                const accessToken = JWT.generateAccessToken(user);
                return { user, accessToken };
            }
            throw new Error("Incorrect email or password");
        }
        catch (error) {
            console.error(error);
            throw new Error("Server error while logging in");
        }
    }),
    deleteUser: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(args.id, "dele");
            const userId = args.id;
            const deleteUserId = yield deleteUserByIdService(Number(userId));
            return `${deleteUserId} user deleted successfully`;
        }
        catch (error) {
            console.error(error);
            throw new Error("Server error while deleting user");
        }
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield getAllUsersService();
            if (allUsers === undefined) {
                throw new Error("Failed to retrieve user data");
            }
            return allUsers;
        }
        catch (error) {
            console.error(error);
            throw new Error("Server error while getting all users");
        }
    }),
    getRegisterTime: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield getTimeRegisterService();
            if (allUsers === undefined) {
                throw new Error("Failed to retrieve user data");
            }
            return allUsers;
        }
        catch (error) {
            console.error(error);
            throw new Error("Server error while getting all users");
        }
    }),
    getTimeRegister: {
        subscribe: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const allUsers = yield getTimeRegisterService();
                if (allUsers === undefined) {
                    throw new Error("Failed to retrieve user data");
                }
                return pubsub.asyncIterator(["TIME_REGISTER_CHANNEL"]);
            }
            catch (error) {
                console.error(error);
                throw new Error("Server error while getting all users");
            }
        }),
    },
};
//# sourceMappingURL=userResolvers.js.map