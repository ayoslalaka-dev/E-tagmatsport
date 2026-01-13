import { Response, NextFunction } from 'express';
import { OfferService } from '../services/offer.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const offerService = new OfferService();

export class OfferController {
    async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const { tenderId, prix, delai, commentaire } = req.body;

            if (!tenderId || !prix || !delai) {
                return res.status(400).json({ message: 'Tender ID, price and delay are required' });
            }

            const offer = await offerService.create(req.user.id, {
                tenderId,
                prix,
                delai,
                commentaire
            });

            res.status(201).json(offer);
        } catch (error) {
            next(error);
        }
    }

    async findByTender(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { tenderId } = req.params;
            const offers = await offerService.findByTender(tenderId);
            res.json(offers);
        } catch (error) {
            next(error);
        }
    }

    async findMyOffers(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const offers = await offerService.findByUser(req.user.id);
            res.json(offers);
        } catch (error) {
            next(error);
        }
    }

    async accept(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const { id } = req.params;
            const offer = await offerService.accept(id, req.user.id);
            res.json(offer);
        } catch (error) {
            next(error);
        }
    }

    async reject(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const { id } = req.params;
            const offer = await offerService.reject(id, req.user.id);
            res.json(offer);
        } catch (error) {
            next(error);
        }
    }
}
