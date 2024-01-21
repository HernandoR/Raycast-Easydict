/*
 * @Author: HernandoR lzhen.dev@outlook.com
 * @CreateDate: Do not edit
 * @LastEditors: HernandoR lzhen.dev@outlook.com
 * @LastEditTime: 2024-01-20
 * @Description: default logger for the
 * 
 * Copyright (c) 2024by HernandoR lzhen.dev@outlook.com, All Rights Reserved. 
 */
import winston from "winston";

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
  ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
