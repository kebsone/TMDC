import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { LineRef } from "../entity/LineRef";
    
class LineRefController {
  static getLinesRef = async (req: Request, res: Response) => {
    console.log(req.body);
    const programCode = req.body.programCode;
    const result = await getRepository(LineRef).find({
      where: {
        programCode: programCode,
      },
    }); 
    console.log(result);
    return res.json(result);
  };
}

export default LineRefController;
