import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = new IORedis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    maxRetriesPerRequest: null,
});

export { connection };

// 1. Definition of the Dispatch Queue
export const dispatchQueue = new Queue('groupage-dispatch', { connection });

// 2. Logic to add a dispatch job
export const addDispatchJob = async (tenderId: string, groupageData: any) => {
    await dispatchQueue.add('process-dispatch', {
        tenderId,
        ...groupageData,
        timestamp: new Date()
    }, {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    });
};

// 3. Worker to process dispatching based on availability and "vide" (empty space)
export const setupDispatchWorker = () => {
    const worker = new Worker('groupage-dispatch', async (job: Job) => {
        const { tenderId, origin, destination, weight, volume } = job.data;

        console.log(`[Queue] Processing dispatch for Tender #${tenderId}`);
        console.log(`[Queue] Searching for available carriers on route ${origin} -> ${destination}`);
        console.log(`[Queue] Capacity check: Weight ${weight}kg, Volume ${volume}CBM`);

        // Here we would implement the matching algorithm:
        // 1. Query carriers with matching routes
        // 2. Check their current "vide" (remaining capacity)
        // 3. Emit real-time notifications to matching carriers via Socket.io

        // Mocking logic
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(`[Queue] Dispatch completed for job ${job.id}`);

        return { success: true, notifiedCount: 5 };
    }, { connection });

    worker.on('completed', (job) => {
        console.log(`[Queue] Job ${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
        console.log(`[Queue] Job ${job?.id} has failed with ${err.message}`);
    });

    return worker;
};
