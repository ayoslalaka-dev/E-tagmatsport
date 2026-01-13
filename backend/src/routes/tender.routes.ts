import { Router } from 'express';
import { TenderController } from '../controllers/tender.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const tenderController = new TenderController();

// All tender routes require authentication
router.use(authMiddleware);

// Get all tenders (open to all authenticated users)
router.get('/', tenderController.findAll.bind(tenderController));

// Get tender stats
router.get('/stats', tenderController.getStats.bind(tenderController));

// Get my tenders (created by current user)
router.get('/my', tenderController.findMyTenders.bind(tenderController));

// Get single tender
router.get('/:id', tenderController.findById.bind(tenderController));

// Create tender (SHIPPER and ADMIN only)
router.post('/', roleMiddleware('SHIPPER', 'ADMIN'), tenderController.create.bind(tenderController));

// Update tender
router.put('/:id', tenderController.update.bind(tenderController));

// Delete tender
router.delete('/:id', tenderController.delete.bind(tenderController));

export default router;
