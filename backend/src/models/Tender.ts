import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export enum TenderStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    AWARDED = 'AWARDED',
    CANCELLED = 'CANCELLED'
}

class Tender extends Model {
    public id!: string;
    public title!: string;
    public description?: string;
    public origin!: string;
    public destination!: string;
    public weight!: number;
    public volume!: number;
    public deadline!: Date;
    public status!: TenderStatus;
    public shipper_id!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Tender.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    volume: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(TenderStatus)),
        defaultValue: TenderStatus.OPEN,
    },
    shipper_id: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Tender',
    tableName: 'tenders',
});

export default Tender;
