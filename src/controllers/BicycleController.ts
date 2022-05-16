import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Bicycle } from "../entity/Bicycle";
import { Post } from "../entity/Post";

class BicycleController {
  static addBicycle = async (req: Request, res: Response) => {
    const bicycle = {
      msnNumber: req.body.msnNumber,
    };

    const newBicycle = getRepository(Bicycle).create(bicycle);
    const result = await getRepository(Bicycle).save(newBicycle);
    return res.json(result);
  };
}

export default BicycleController;
