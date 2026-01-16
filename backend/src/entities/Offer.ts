import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Tender } from './Tender';

export enum OfferStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

@Entity('offers')
export class Offer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    prix: number;

    @Column()
    delai: string;

    @Column({ nullable: true })
    commentaire: string;

    @Column({
        type: 'enum',
        enum: OfferStatus,
        default: OfferStatus.PENDING
    })
    status: OfferStatus;

    @Column({ type: 'jsonb', nullable: true })
    route: {
        name: string;
        latitude: number;
        longitude: number;
        type: 'city' | 'country';
    }[];

    @ManyToOne(() => Tender, tender => tender.offers)
    @JoinColumn({ name: 'tenderId' })
    tender: Tender;

    @Column()
    tenderId: string;

    @ManyToOne(() => User, user => user.offers)
    @JoinColumn({ name: 'prestataireId' })
    prestataire: User;

    @Column()
    prestataireId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
