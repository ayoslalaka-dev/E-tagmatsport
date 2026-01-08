import { Request, Response } from 'express';
import { Tender, User } from '../models';
import { addDispatchJob } from '../queues/dispatch.queue';

export const createTender = async (req: Request, res: Response) => {
    try {
        const { title, description, origin, destination, weight, volume, deadline } = req.body;
        const shipper_id = (req as any).user.userId;

        const tender = await Tender.create({
            title,
            description,
            origin,
            destination,
            weight: parseFloat(weight),
            volume: parseFloat(volume),
            deadline: new Date(deadline),
            shipper_id
        });

        // Queue the dispatch job in the background
        await addDispatchJob(tender.id, {
            origin,
            destination,
            weight: parseFloat(weight),
            volume: parseFloat(volume)
        });

        res.status(201).json(tender);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTenders = async (req: Request, res: Response) => {
    try {
        const tensors = await Tender.findAll({
            include: [{ model: User, as: 'shipper', attributes: ['id', 'name', 'email'] }],
            order: [['created_at', 'DESC']]
        });
        res.json(tensors);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
