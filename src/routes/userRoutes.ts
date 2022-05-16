import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/add", UserController.addUser);
router.get("/all", UserController.getAllUsers);
router.put("/user", UserController.updatUser);

const userRouter = Router();
userRouter.use("/users", router);
export default userRouter;
