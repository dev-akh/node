import { config } from "dotenv";

config();

const closeCallbacks: (() => Promise<void>)[] = [];

export const closePlatform = () => Promise.all(closeCallbacks.map((callback) => callback()));

export async function bootstrapPlatform(): Promise<void> {
  const APP_MODE = process.env.APP_MODE as string;

  // const GOOGLE_CLIENT_ID           = process.env.GOOGLE_CLIENT_ID as string;
  // const GOOGLE_CLIENT_SECRET       = process.env.GOOGLE_CLIENT_SECRET as string;
  // const GOOGLE_CLIENT_REDIRECT_URL = process.env.GOOGLE_CLIENT_REDIRECT_URL as string;
  // const GOOGLE_PROJECT_ID          = process.env.GOOGLE_PROJECT_ID as string;
  // const GOOGLE_PRIVATE_KEY         = process.env.GOOGLE_PRIVATE_KEY as string;
  // const GOOGLE_CLIENT_EMAIL        = process.env.GOOGLE_CLIENT_EMAIL as string;

  switch (APP_MODE) {
    case "local":
      // do something
      // "Your app running on Local";
      break;
    case "production":
    default:
      // do something
      // "Your app running on Production";
      break;
  }
}
