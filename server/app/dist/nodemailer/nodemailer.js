var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from "nodemailer";
import * as dotenv from 'dotenv';
dotenv.config();
export function generateUniqueCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
export function sendemail(user, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: user,
            subject: "Confirmation email",
            text: "code to reset your password",
            html: code,
        });
        console.log("Message sent: %s", info.messageId);
    });
}
//# sourceMappingURL=nodemailer.js.map