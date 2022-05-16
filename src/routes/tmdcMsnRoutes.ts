import { Router } from "express";
import UserController from "../controllers/UserController";
import TmdcMsnController from "../controllers/TmdcMsnController";

const router = Router();
router.get("/:msnNumber/:programCode/:siteId", TmdcMsnController.getTmdcMsn);
router.post("/add", TmdcMsnController.addTmdcMsn);
router.get("/:programCode/:siteId", TmdcMsnController.allTmdcMsns)
router.post("/gti", TmdcMsnController.updateTmdcGti);
router.put("/gtis", TmdcMsnController.updateTmdcGtis);
router.delete("/gtis", TmdcMsnController.deleteGtis);
router.post("/gtis", TmdcMsnController.addTmdcGtis);
router.post("/update", TmdcMsnController.editGti);
const tmdcMsnRouter = Router();
tmdcMsnRouter.use("/msns", router);
export default tmdcMsnRouter;
