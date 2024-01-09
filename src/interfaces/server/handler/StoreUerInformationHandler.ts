import { Request, Response, NextFunction } from "express";
import { asyncMiddleware } from "../middleware/AsyncMiddleware";
import * as Logger from "../../../utils/Logger";

/**
 * Store user information
 *
 * @yields {200} return success storing
 * @yields {500} Server error
 */
const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Getting user information from the database
    if (req) {
      const email = req.body.email;
      res.status(200).json({ success: true, email: email });
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
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
