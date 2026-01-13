import { AppDataSource } from '../config/database';
import { Offer, OfferStatus } from '../entities/Offer';
import { Tender, TenderStatus } from '../entities/Tender';
import { AppError } from '../middlewares/error.middleware';

interface CreateOfferDTO {
    tenderId: string;
    prix: number;
    delai: string;
    commentaire?: string;
}

export class OfferService {
    private offerRepository = AppDataSource.getRepository(Offer);
    private tenderRepository = AppDataSource.getRepository(Tender);

    async create(prestataireId: string, data: CreateOfferDTO): Promise<Offer> {
        // Check if tender exists and is open
        const tender = await this.tenderRepository.findOne({ where: { id: data.tenderId } });
        if (!tender) {
            throw new AppError('Tender not found', 404);
        }

        if (tender.statut !== TenderStatus.OPEN) {
            throw new AppError('Tender is not open for offers', 400);
        }

        // Check if user already made an offer
        const existingOffer = await this.offerRepository.findOne({
            where: { tenderId: data.tenderId, prestataireId }
        });

        if (existingOffer) {
            throw new AppError('You have already made an offer for this tender', 400);
        }

        const offer = this.offerRepository.create({
            ...data,
            prestataireId,
            status: OfferStatus.PENDING
        });

        return await this.offerRepository.save(offer);
    }

    async findByTender(tenderId: string): Promise<Offer[]> {
        return await this.offerRepository.find({
            where: { tenderId },
            relations: ['prestataire'],
            order: { createdAt: 'DESC' }
        });
    }

    async findByUser(prestataireId: string): Promise<Offer[]> {
        return await this.offerRepository.find({
            where: { prestataireId },
            relations: ['tender'],
            order: { createdAt: 'DESC' }
        });
    }

    async accept(offerId: string, userId: string): Promise<Offer> {
        const offer = await this.offerRepository.findOne({
            where: { id: offerId },
            relations: ['tender']
        });

        if (!offer) {
            throw new AppError('Offer not found', 404);
        }

        if (offer.tender.createdById !== userId) {
            throw new AppError('Not authorized to accept this offer', 403);
        }

        // Accept this offer
        offer.status = OfferStatus.ACCEPTED;
        await this.offerRepository.save(offer);

        // Reject all other offers for this tender
        await this.offerRepository
            .createQueryBuilder()
            .update(Offer)
            .set({ status: OfferStatus.REJECTED })
            .where('tenderId = :tenderId', { tenderId: offer.tenderId })
            .andWhere('id != :offerId', { offerId })
            .execute();

        // Update tender status
        offer.tender.statut = TenderStatus.ASSIGNED;
        await this.tenderRepository.save(offer.tender);

        return offer;
    }

    async reject(offerId: string, userId: string): Promise<Offer> {
        const offer = await this.offerRepository.findOne({
            where: { id: offerId },
            relations: ['tender']
        });

        if (!offer) {
            throw new AppError('Offer not found', 404);
        }

        if (offer.tender.createdById !== userId) {
            throw new AppError('Not authorized to reject this offer', 403);
        }

        offer.status = OfferStatus.REJECTED;
        return await this.offerRepository.save(offer);
    }
}
