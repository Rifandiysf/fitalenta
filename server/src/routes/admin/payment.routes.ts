import { Router } from "express";
import * as paymentController from "../../controllers/admin/payment.controller";
import { ADMIN_PANEL_ROLES } from "../../config/admin.config";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { validate } from "../../middlewares/validate";
import {
  createInvoiceRules,
  exportInvoiceRules,
  issueInvoiceRules,
  listPaymentsRules,
  paymentIdRules,
  verifyPaymentRules,
} from "../../validators/payment.validator";

const router = Router();

router.use(authenticate, authorize(...ADMIN_PANEL_ROLES));
router.get("/summary", paymentController.summary);
router.get("/options", paymentController.options);
router.get("/", validate(listPaymentsRules), paymentController.index);
router.post("/", validate(createInvoiceRules), paymentController.store);
router.get("/:id", validate(paymentIdRules), paymentController.show);
router.get("/:id/invoice", validate(exportInvoiceRules), paymentController.invoicePdf);
router.post("/:id/issue", validate(issueInvoiceRules), paymentController.issue);
router.post("/:id/verify", validate(verifyPaymentRules), paymentController.verify);

export default router;