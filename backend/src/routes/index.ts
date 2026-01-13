import { Router } from 'express';
import authRoutes from './auth.routes';
import tenderRoutes from './tender.routes';
import offerRoutes from './offer.routes';

const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/tenders', tenderRoutes);
router.use('/offers', offerRoutes);

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;
