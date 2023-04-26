import cors from "cors";
import { corsOptions } from "../../infrastructure/config/cors";

const corsPolicyMiddleware = cors(corsOptions);

export default corsPolicyMiddleware;
