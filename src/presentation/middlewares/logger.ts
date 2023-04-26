import path from "node:path";
import fs from "node:fs";
import morgan from "morgan";

const accessLogStream = fs.createWriteStream(
  path.resolve(__dirname, "..", "..", "logs", "access.log"), { 
    flags: "a" 
  }
);

const logger = morgan('combined', { stream: accessLogStream });

export default logger;
