var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { getUserById } from "../users/userDal.js";
dotenv.config();
const isAdmin = (user) => {
    return user.isadmin ? true : false;
};
const urlNeedAdmin = (url) => {
    const needAdmin = ['/api/users/'];
    return needAdmin.includes(url);
};
export const generateAccessToken = (user) => {
    const secretKey = process.env.SECRET_TOKEN_KEY;
    return Jwt.sign(String(user.id), secretKey);
};
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) {
        return res.json("no token found").sendStatus(401);
    }
    const secretKey = process.env.SECRET_TOKEN_KEY;
    Jwt.verify(token, secretKey, (err, userId) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.json({ message: "Token verification failed" }).sendStatus(403);
        if (urlNeedAdmin(req.originalUrl)) {
            const user = yield getUserById(userId);
            console.log(user);
            if (user[0].isadmin) {
                next();
            }
            else {
                res.json({ message: "allow only for admin" }).sendStatus(406);
            }
        }
        else {
            next();
        }
    }));
};
export const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (token) {
            const user = Jwt.verify(token, process.env.SECRET_TOKEN_KEY);
            return user;
        }
        return null;
    }
    catch (error) {
        return null;
    }
});
// export const verifyAdminToken=(req:Request, res:Response, next:NextFunction) => {
//   const token = req.headers['authorization']
//   if (token == null) {
//       return res.json( "no token found" ).sendStatus(401)
//   }
//   const secretKey:string=process.env.SECRET_TOKEN_KEY as string
//   Jwt.verify(token,secretKey , (err, user: UserInterface | unknown ) => {
//     if (err){
//       return res.json({ message: "Token verification failed" }).sendStatus(403)
//     }else if((user as UserInterface).isadmin){
//       req.body.user = user as UserInterface
//       next()
//     }else{
//       return res.json({ message: "allow only for admin" }).sendStatus(406)
//     }
//   })
// }
//   export const refreshTokens:string[] = [];
//   export const refreshToken = (req:Request, res:Response) => {
//       const refreshToken = req.body.refreshToken
//       if (refreshToken == null){
//          return res.sendStatus(401)
//       }
//       if (!refreshTokens.includes(refreshToken)) {
//         return res.sendStatus(403)
//       }
//       const secretKey:string=process.env.SECRET_REFRESH_TOKEN_KEY as string
//       Jwt.verify(refreshToken, secretKey, (err:unknown, user:UserInterface | unknown) => {
//         if (err) {
//           return res.sendStatus(403);
//         }
//         const accessToken = generateAccessToken(user as UserInterface);
//         res.json({ accessToken: accessToken });
//       });
// }
// export const generateRefreshToken=(user:UserInterface) => {
//   const secretKey:string=process.env.SECRET_REFRESH_TOKEN_KEY as string
//   return Jwt.sign(user,secretKey)
// }
//# sourceMappingURL=jwt.js.map