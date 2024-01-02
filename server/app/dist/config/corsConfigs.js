import { allowedOrigins } from "./allowedOrigins.js";
export const corsConfigs = (req, callback) => {
    let corsOptions;
    if (allowedOrigins.includes(String(req.header('Origin')))) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
        throw new Error('origin not allowed by Cors');
    }
    callback(null, corsOptions);
};
//# sourceMappingURL=corsConfigs.js.map