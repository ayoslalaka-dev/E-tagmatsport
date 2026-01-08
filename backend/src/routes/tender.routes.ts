import { Router } from 'express';
import * as tenderController from '../controllers/tender.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, tenderController.getTenders);
router.post('/', authenticate, authorize(['BENEFICIARY', 'ADMIN']), tenderController.createTender);

export default router;
