import { Router } from 'express';
import * as offerController from '../controllers/offer.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize(['PROVIDER']), offerController.submitOffer);
router.patch('/:id/accept', authenticate, authorize(['BENEFICIARY', 'ADMIN']), offerController.acceptOffer);

export default router;
