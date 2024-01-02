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
import { getAllGraphsService } from "./graphsService.js";
const pubsub = new PubSub();
let flag = true;
export const graphsResolvers = {
    getAllGraphs: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield getAllGraphsService();
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
};
//# sourceMappingURL=graphsResolver.js.map