import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Post } from "../entity/Post";

class LineController {
  static addLine = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    const newPost = {
      title: req.body.title,
      remainder: req.body.remainder,
      gtis: req.body.gtis,
    };

    const post = getRepository(Post).create(newPost);
    const result = await getRepository(Post).save(newPost);
    return res.json(result);
  };
}

export default LineController;
