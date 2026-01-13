import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Tender } from './Tender';
import { Offer } from './Offer';

export enum UserRole {
    SHIPPER = 'SHIPPER',
    CARRIER = 'CARRIER',
    ADMIN = 'ADMIN'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nom: string;

    @Column({ unique: true })
    email: string;

    @Column()
    mot_de_passe: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.SHIPPER
    })
    role: UserRole;

    @OneToMany(() => Tender, tender => tender.createdBy)
    tenders: Tender[];

    @OneToMany(() => Offer, offer => offer.prestataire)
    offers: Offer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
