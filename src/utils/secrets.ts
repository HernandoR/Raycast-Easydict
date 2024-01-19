import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";


if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug(".env file not found, assuming production")
  dotenv.config({ path: ".env.production" }); // if this is also not existing, the program will end and exist
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

if (!prod){
    logger.debug("not production env, load extra vars")
    dotenv.config({ path: ".env"+ENVIRONMENT });
}

if (!process.env["DEEPL_AUTH_KEY"]) {
  logger.error("No DEEPL_AUTH_KEY. Set DEEPL_AUTH_KEY environment variable.");
  process.exit(1);
}
export const DeepLAuthKey:string = process.env["DEEPL_AUTH_KEY"];

if (!process.env["CAIYUN_TOKEN"]) {
  logger.error("No CAIYUN_TOKEN. Set CAIYUN_TOKEN environment variable.");
  process.exit(1);
}
export const EncryptedCaiyunToken:string = process.env["CAIYUN_TOKEN"];





