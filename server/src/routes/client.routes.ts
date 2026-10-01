import { Router } from "express";
import * as clientController from "../controllers/client.controller";

const router = Router();
router.get("/", clientController.index);
export default router;