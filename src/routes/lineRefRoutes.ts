import { Router } from "express";
import LineRefController from "../controllers/LineRefController";

const router = Router();

router.post("/all", LineRefController.getLinesRef);
const linesRefRouter = Router();
linesRefRouter.use("/linesRef", router);
export default linesRefRouter;
