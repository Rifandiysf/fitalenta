import { Router } from "express";
import * as adminPartnerController from "../../controllers/admin/partner.controller";
import { cmsAccess } from "../../middlewares/access";
import { uploadPartnerLogo } from "../../middlewares/upload";

const router = Router();
router.use(...cmsAccess);

router.get("/clients", adminPartnerController.indexClients);
router.post("/clients", uploadPartnerLogo.single("logo"), adminPartnerController.storeClient);
router.put("/clients/:id", uploadPartnerLogo.single("logo"), adminPartnerController.updateClient);
router.delete("/clients/:id", adminPartnerController.destroyClient);
router.patch("/clients/:id/toggle", adminPartnerController.toggleClient);

router.get("/universities", adminPartnerController.indexUniversityPartners);
router.post("/universities", uploadPartnerLogo.single("logo"), adminPartnerController.storeUniversityPartner);
router.put("/universities/:id", uploadPartnerLogo.single("logo"), adminPartnerController.updateUniversityPartner);
router.delete("/universities/:id", adminPartnerController.destroyUniversityPartner);

export default router;
