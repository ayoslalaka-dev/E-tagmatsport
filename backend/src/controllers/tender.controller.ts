import { Response, NextFunction } from 'express';
import { TenderService } from '../services/tender.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const tenderService = new TenderService();

export class TenderController {
    async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const { type, origine, destination, date, description, budget, weight } = req.body;

            if (!type || !origine || !destination || !date) {
                return res.status(400).json({ message: 'Type, origine, destination and date are required' });
            }

            const tender = await tenderService.create(req.user.id, {
                type,
                origine,
                destination,
                date: new Date(date),
                description,
                budget,
                weight
            });

            res.status(201).json(tender);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { statut, type } = req.query;
            const tenders = await tenderService.findAll({
                statut: statut as any,
                type: type as any
            });
            res.json(tenders);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const tender = await tenderService.findById(id);
            res.json(tender);
        } catch (error) {
            next(error);
        }
    }

    async findMyTenders(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const tenders = await tenderService.findByUser(req.user.id);
            res.json(tenders);
        } catch (error) {
            next(error);
        }
    }

    async update(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const { id } = req.params;
            const tender = await tenderService.update(id, req.user.id, req.body);
            res.json(tender);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const { id } = req.params;
            await tenderService.delete(id, req.user.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getStats(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const stats = await tenderService.getStats();
            res.json(stats);
        } catch (error) {
            next(error);
        }
    }
}
