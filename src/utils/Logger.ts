import * as winston from "winston";

const DailyRotateFile = require("winston-daily-rotate-file");// eslint-disable-line @typescript-eslint/no-var-requires

const timestamp = new Date().toISOString().replace("T", " ").substr(0, 23);

const fileRotateTransport = new DailyRotateFile({
  filename: "./logs/%DATE%.log",
  datePattern: "YYYY-MM-DD",
});

const customFormat = winston.format.printf(({ level, message }) => {
  console.log(message);
  const customData = {
    level: level,
    time: timestamp,
    ipAddress: process.pid,
    memory: (process.memoryUsage().rss / (1024 * 1024)).toFixed(2) + " MB",
    message: message // may error
  };
  return `${JSON.stringify(customData)}`;
});

export let instance: winston.Logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    customFormat
  ),
  transports: [fileRotateTransport],
});

export function setLogger(logger: winston.Logger) {
  instance = logger;
}

