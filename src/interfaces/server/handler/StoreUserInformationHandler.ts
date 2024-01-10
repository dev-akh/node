import { Request, Response, NextFunction } from "express";
import { asyncMiddleware } from "../middleware/AsyncMiddleware";
import * as Logger from "../../../utils/Logger";
import { StoreUserInformationUsecase } from "../../../application/usecase/StoreUserInformationUsecase";
import * as schema from "../../../domain/schema";
import { AlreadyExistUserError } from "../../../application/controller/errors/AlreadyExistUserError";

/**
 * Store user information
 *
 * @yields {201} return success storing
 * @yields {409} Already exist user
 * @yields {500} Server error
 */
const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeUserUC = new StoreUserInformationUsecase();
    const userInformation: schema.IUserData = {
      email: req.body.email,
      emailVerified: false,
      name: req.body.name,
      picture: req.body.picture,
      phone: req.body.phone,
      city: req.body.city,
      address: req.body.address,
      age: req.body.age,
      gender: req.body.gender,
      fatherName: req.body.fatherName,
      joinDate: req.body.joinDate,
      userRole: 0,
      isBlock: false
    };

    const isStore = await storeUserUC.storeUserInformation(userInformation);
    if (isStore) {
      const email = req.body.email;
      res.status(201).json({ success: true, email: email });
    } else {
      res.status(500).json({ success: false, error: "Failed to store user information." });
    }
    return;
  } catch (e) {
    if (e instanceof AlreadyExistUserError || e instanceof Error) {
      Logger.instance.error(e.message);
      res.status(409).json({success: false, error: e.message});
    } else {
      Logger.instance.error("Unknown error occurred.");
      res.sendStatus(500);
    }
    return;
  } finally {
    next();
  }
};

export const StoreUserInformationHandler = asyncMiddleware(handler);
