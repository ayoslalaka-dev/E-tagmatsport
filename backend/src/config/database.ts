import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../entities/User';
import { Tender } from '../entities/Tender';
import { Offer } from '../entities/Offer';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: env.NODE_ENV === 'development', // Auto-sync in dev only
    logging: env.NODE_ENV === 'development',
    entities: [User, Tender, Offer],
    migrations: [],
    subscribers: [],
});
