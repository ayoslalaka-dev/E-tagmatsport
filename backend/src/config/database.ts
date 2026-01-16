import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../entities/User';
import { Tender } from '../entities/Tender';
import { Offer } from '../entities/Offer';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true, // Auto-sync for dev/sqlite
    logging: env.NODE_ENV === 'development',
    entities: [User, Tender, Offer],
    migrations: [],
    subscribers: [],
});
