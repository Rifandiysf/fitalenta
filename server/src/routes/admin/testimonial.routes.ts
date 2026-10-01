import { Router } from "express";
import * as adminTestimonialController from "../../controllers/admin/testimonial.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { uploadTestimonialImage } from "../../middlewares/upload";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminTestimonialController.index);
router.post("/", uploadTestimonialImage.single("image"), adminTestimonialController.store);
router.put("/:id", uploadTestimonialImage.single("image"), adminTestimonialController.update);
router.delete("/:id", adminTestimonialController.destroy);
router.patch("/:id/toggle", adminTestimonialController.toggle);
export default router;