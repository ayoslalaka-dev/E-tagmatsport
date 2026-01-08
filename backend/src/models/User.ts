import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export enum UserRole {
    SHIPPER = 'SHIPPER',
    CARRIER = 'CARRIER',
    ADMIN = 'ADMIN'
}

class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
    public role!: UserRole;
    public name!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.SHIPPER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

export default User;
