import pkg from 'bcryptjs';
const { hashSync, compareSync } = pkg;
// import { hashSync, compareSync } from "bcryptjs";
export const generateUserPassword = (password) => hashSync(password, 10);
export const comparePassword = (passwordFromClient, passwordFromDB) => compareSync(passwordFromClient, passwordFromDB);
//# sourceMappingURL=bycrypt.js.map