import { userResolvers } from '../users/userResolvers.js';
import { graphsResolvers } from '../graphs/graphsResolver.js';
export const resolvers = {
    Query: {
        getAllUsers: userResolvers.getAllUsers,
        getRegisterTime: userResolvers.getRegisterTime,
        getAllGraphs: graphsResolvers.getAllGraphs
    },
    Mutation: {
        registerUser: userResolvers.registerUser,
        loginUser: userResolvers.login,
        deleteUser: userResolvers.deleteUser,
        forgotPassword: userResolvers.forgotPassword,
        comperepassword: userResolvers.comperepassword,
        resetPassword: userResolvers.resetPassword,
    },
    Subscription: {
        getTimeRegister: userResolvers.getTimeRegister
    },
};
//# sourceMappingURL=resolvers.js.map