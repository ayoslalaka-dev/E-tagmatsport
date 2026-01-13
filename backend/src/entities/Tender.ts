import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { Offer } from './Offer';

export enum TenderStatus {
    OPEN = 'OPEN',
    ASSIGNED = 'ASSIGNED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum TenderType {
    GROUPAGE = 'GROUPAGE',
    FULL_TRUCK = 'FULL_TRUCK',
    EXPRESS = 'EXPRESS',
    STANDARD = 'STANDARD'
}

@Entity('tenders')
export class Tender {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: TenderType,
        default: TenderType.GROUPAGE
    })
    type: TenderType;

    @Column()
    origine: string;

    @Column()
    destination: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({
        type: 'enum',
        enum: TenderStatus,
        default: TenderStatus.OPEN
    })
    statut: TenderStatus;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    budget: number;

    @Column({ nullable: true })
    weight: string;

    @ManyToOne(() => User, user => user.tenders)
    @JoinColumn({ name: 'createdById' })
    createdBy: User;

    @Column()
    createdById: string;

    @OneToMany(() => Offer, offer => offer.tender)
    offers: Offer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
