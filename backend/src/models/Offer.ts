import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export enum OfferStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

class Offer extends Model {
    public id!: string;
    public tender_id!: string;
    public carrier_id!: string;
    public price!: number;
    public transit_time!: string;
    public remarks?: string;
    public status!: OfferStatus;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Offer.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tender_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    carrier_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    transit_time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(OfferStatus)),
        defaultValue: OfferStatus.PENDING,
    }
}, {
    sequelize,
    modelName: 'Offer',
    tableName: 'offers',
});

export default Offer;
