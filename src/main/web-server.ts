import express from "express";
import logger from "../presentation/middlewares/logger";
import router from "./routes";
import corsPolicy from "../presentation/middlewares/cors-policy";

const webServerExpress = express();

webServerExpress.use(express.urlencoded({ extended: true }));
webServerExpress.use(express.json());
webServerExpress.use(corsPolicy);
webServerExpress.use("/api/v1", router);
webServerExpress.use(logger);

export default webServerExpress;
