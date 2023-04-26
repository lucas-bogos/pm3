import * as dotenv from "dotenv";
import webServerExpress from "./web-server";

dotenv.config();

export const init = () => {
  webServerExpress.listen(process.env.NODE_PORT, () => ( 
    console.log("HTTP Server working...") 
  ));
}
