import { Router } from 'express';
import { OfferController } from '../controllers/offer.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const offerController = new OfferController();

// All offer routes require authentication
router.use(authMiddleware);

// Get my offers (as carrier)
router.get('/my', offerController.findMyOffers.bind(offerController));

// Get offers for a tender
router.get('/tender/:tenderId', offerController.findByTender.bind(offerController));

// Create offer (CARRIER only)
router.post('/', roleMiddleware('CARRIER', 'ADMIN'), offerController.create.bind(offerController));

// Accept offer (tender owner only - handled in service)
router.post('/:id/accept', offerController.accept.bind(offerController));

// Reject offer (tender owner only - handled in service)
router.post('/:id/reject', offerController.reject.bind(offerController));

export default router;
