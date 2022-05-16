import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

class UserController {
  static addUser = async (req: Request, res: Response) => {
    const existingUser = await getRepository(User).findOne(req.body.gtsiUserId);
    if (existingUser) {
      return res.json(existingUser);
    }
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      isManager: req.body.isManager,
      gtsiUserId: req.body.gtsiUserId,
      email: req.body.email,
    };
    const tmdcUser = getRepository(User).create(user);
    const result = await getRepository(User).save(tmdcUser);
    return res.json(result);
  };

  static getAllUsers = async (req: Request, res: Response) => {
    const tmdcUsers = await getRepository(User).find();
    return res.json(tmdcUsers);
  };

  static updatUser = async (req: Request, res: Response) => {
    const user = await getRepository(User).findOne(req.body.gtsiUserId);
    if (user) {
      getRepository(User).merge(user, req.body);
      const result = await getRepository(User).save(user);
      return res.json(result);
    }
    return res.json({ message: "User not found" });
  };
}

export default UserController;
