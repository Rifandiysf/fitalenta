import { Router } from "express";
import * as adminArticleController from "../../controllers/admin/article.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { uploadArticleImage } from "../../middlewares/upload";

const router = Router();

router.use(authenticate, authorize("admin", "editor"));

router.get("/", adminArticleController.index);
router.get("/:id", adminArticleController.show);
router.post("/", uploadArticleImage.single("image"), adminArticleController.store);
router.put("/:id", uploadArticleImage.single("image"), adminArticleController.update);
router.delete("/:id", adminArticleController.destroy);

export default router;