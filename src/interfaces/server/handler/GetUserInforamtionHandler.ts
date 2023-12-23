import { Request, Response, NextFunction } from "express";
import { asyncMiddleware } from "../middleware/AsyncMiddleware";
import * as Logger from "../../../utils/Logger";

/**
 * Getting user information
 *
 * @yields {200} return user information
 * @yields {404} Not found user
 * @yields {500} Server error
 */
const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Getting user information from the database
    if (req) {
      res.status(200).json({ success: true });
    } else {
      res.sendStatus(404);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      Logger.instance.error(e.message);
    } else {
      Logger.instance.error("Unknown error occurred.");
    }
    res.sendStatus(500);
  } finally {
    next();
  }
};

export const GetUserInformationHandler = asyncMiddleware(handler);
