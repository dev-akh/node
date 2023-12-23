import { bootstrapPlatform, closePlatform } from "./bootstrap";

import { Settings } from "luxon";
import { app } from "./interfaces/server/app";
import * as Logger from "./utils/Logger";

const API_CORS_ORIGIN  = process.env.API_CORS_ORIGIN as string;
const RUNNING_PORT     = process.env.RUNNING_PORT as number | string;
Settings.defaultZone   = "Asia/Yangon";
Settings.defaultLocale = "mm";

try {
  bootstrapPlatform().then(() => {
    // do something here
    app(API_CORS_ORIGIN)
    .listen(RUNNING_PORT, () => Logger.instance.info(`App listening on port ${RUNNING_PORT}!`));
  });
} catch (e: unknown) {
  if (e instanceof Error) {
    Logger.instance.error(e.message);
  } else {
    Logger.instance.error("Unknown error occurred.");
  }
} finally {
  closePlatform();
}
