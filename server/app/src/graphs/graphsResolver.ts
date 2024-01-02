// userResolvers.ts
import { PubSub } from "graphql-subscriptions";
import { UserInterface } from "../interfaces/userInterface.js";
import { getAllGraphsService } from "./graphsService.js";
import { resolversinterface } from "../interfaces/resolverinterface.js";
import * as JWT from "../jwt/jwt.js";
import { generateUniqueCode } from "../nodemailer/nodemailer.js";
import { generateUserPassword } from "../bycrypt/bycrypt.js";
import { sendemail } from "../nodemailer/nodemailer.js";
const pubsub = new PubSub();
let flag = true;
export const graphsResolvers = {
    getAllGraphs: async (): Promise<any> => {
        try {
          const allUsers = await getAllGraphsService();
          if (allUsers === undefined) {
            throw new Error("Failed to retrieve user data");
          }
          return allUsers;
        } catch (error) {
          console.error(error);
          throw new Error("Server error while getting all users");
        }
      },}