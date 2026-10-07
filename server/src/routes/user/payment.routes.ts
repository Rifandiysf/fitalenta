import { Router } from "express";
import * as paymentController from "../../controllers/user/payment.controller";
import { authenticate } from "../../middlewares/authenticate";
import { uploadPaymentProof } from "../../middlewares/upload";

const router = Router();
router.use(authenticate);
router.get("/", paymentController.index);
router.post("/:id/proof", uploadPaymentProof.single("proof"), paymentController.uploadProof);
export default router;