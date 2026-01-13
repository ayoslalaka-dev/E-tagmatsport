import { AppDataSource } from '../config/database';
import { Tender, TenderStatus, TenderType } from '../entities/Tender';
import { AppError } from '../middlewares/error.middleware';

interface CreateTenderDTO {
    type: TenderType;
    origine: string;
    destination: string;
    date: Date;
    description?: string;
    budget?: number;
    weight?: string;
}

interface UpdateTenderDTO {
    type?: TenderType;
    origine?: string;
    destination?: string;
    date?: Date;
    statut?: TenderStatus;
    description?: string;
    budget?: number;
    weight?: string;
}

export class TenderService {
    private tenderRepository = AppDataSource.getRepository(Tender);

    async create(userId: string, data: CreateTenderDTO): Promise<Tender> {
        const tender = this.tenderRepository.create({
            ...data,
            createdById: userId,
            statut: TenderStatus.OPEN
        });

        return await this.tenderRepository.save(tender);
    }

    async findAll(filters?: { statut?: TenderStatus; type?: TenderType }): Promise<Tender[]> {
        const queryBuilder = this.tenderRepository
            .createQueryBuilder('tender')
            .leftJoinAndSelect('tender.createdBy', 'user')
            .leftJoinAndSelect('tender.offers', 'offers')
            .orderBy('tender.createdAt', 'DESC');

        if (filters?.statut) {
            queryBuilder.andWhere('tender.statut = :statut', { statut: filters.statut });
        }

        if (filters?.type) {
            queryBuilder.andWhere('tender.type = :type', { type: filters.type });
        }

        return await queryBuilder.getMany();
    }

    async findById(id: string): Promise<Tender> {
        const tender = await this.tenderRepository.findOne({
            where: { id },
            relations: ['createdBy', 'offers', 'offers.prestataire']
        });

        if (!tender) {
            throw new AppError('Tender not found', 404);
        }

        return tender;
    }

    async findByUser(userId: string): Promise<Tender[]> {
        return await this.tenderRepository.find({
            where: { createdById: userId },
            relations: ['offers'],
            order: { createdAt: 'DESC' }
        });
    }

    async update(id: string, userId: string, data: UpdateTenderDTO): Promise<Tender> {
        const tender = await this.findById(id);

        if (tender.createdById !== userId) {
            throw new AppError('Not authorized to update this tender', 403);
        }

        Object.assign(tender, data);
        return await this.tenderRepository.save(tender);
    }

    async delete(id: string, userId: string): Promise<void> {
        const tender = await this.findById(id);

        if (tender.createdById !== userId) {
            throw new AppError('Not authorized to delete this tender', 403);
        }

        await this.tenderRepository.remove(tender);
    }

    async getStats(): Promise<{ total: number; open: number; completed: number }> {
        const total = await this.tenderRepository.count();
        const open = await this.tenderRepository.count({ where: { statut: TenderStatus.OPEN } });
        const completed = await this.tenderRepository.count({ where: { statut: TenderStatus.COMPLETED } });

        return { total, open, completed };
    }
}
