import { Router } from "express";
import * as reportController from "../../controllers/admin/financialReport.controller";
import { ADMIN_PANEL_ROLES } from "../../config/admin.config";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { uploadReportSpreadsheet } from "../../middlewares/upload";
import { validate } from "../../middlewares/validate";
import {
  importReportRules,
  listReportRules,
  reportFilterRules,
} from "../../validators/financialReport.validator";

const router = Router();

router.use(authenticate, authorize(...ADMIN_PANEL_ROLES));
router.get("/", validate(listReportRules), reportController.index);
router.get("/summary", validate(reportFilterRules), reportController.summary);
router.get("/export", validate(reportFilterRules), reportController.exportXlsx);
router.get("/template", reportController.template);
router.post(
  "/import",
  uploadReportSpreadsheet.single("file"),
  validate(importReportRules),
  reportController.importXlsx
);

export default router;