import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import sequelize from './config/database';
import { initSocket } from './utils/socket';
import { setupDispatchWorker } from './queues/dispatch.queue';
import './models'; // Import to initialize relations

// Routes
import authRoutes from './routes/auth.routes';
import tenderRoutes from './routes/tender.routes';
import offerRoutes from './routes/offer.routes';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Socket.io
initSocket(httpServer);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'E-Tagmat Backend is running with WebSockets' });
});

// Use Routes (MVC)
app.use('/api/auth', authRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/offers', offerRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync models
        await sequelize.sync({ alter: true });
        console.log('Models synchronized.');

        // Start Queues
        setupDispatchWorker();
        console.log('Dispatch worker started!');

        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error during Data Source initialization:', err);
    }
};

startServer();

export { app, httpServer };

