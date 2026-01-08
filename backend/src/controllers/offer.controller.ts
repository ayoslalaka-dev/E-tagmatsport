import { Request, Response } from 'express';
import { Offer, Tender } from '../models';
import { OfferStatus } from '../models/Offer';
import { TenderStatus } from '../models/Tender';

export const submitOffer = async (req: Request, res: Response) => {
    try {
        const { tender_id, price, transit_time, remarks } = req.body;
        const carrier_id = (req as any).user.userId;

        const offer = await Offer.create({
            tender_id,
            carrier_id,
            price: parseFloat(price),
            transit_time,
            remarks,
            status: OfferStatus.PENDING
        });

        res.status(201).json(offer);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const acceptOffer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const offer = await Offer.findByPk(id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        offer.status = OfferStatus.ACCEPTED;
        await offer.save();

        // Award the tender
        await Tender.update(
            { status: TenderStatus.AWARDED },
            { where: { id: offer.tender_id } }
        );

        res.json({ message: 'Offer accepted and tender awarded', offer });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
