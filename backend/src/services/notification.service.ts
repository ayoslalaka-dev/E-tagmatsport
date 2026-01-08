import { emitNotification } from '../utils/socket';

export const sendNotification = (userId: string, title: string, message: string, data?: any) => {
    // Logic to save notification to DB could go here

    // Real-time emission
    emitNotification(userId, {
        title,
        message,
        data,
        timestamp: new Date()
    });
};

export const notifyNewOffer = (beneficiaryId: string, tenderId: string, providerName: string) => {
    sendNotification(
        beneficiaryId,
        'New Offer Received',
        `${providerName} has submitted a new offer for your tender #TND-${tenderId.slice(0, 8)}`,
        { tenderId, type: 'NEW_OFFER' }
    );
};

export const notifyOfferAccepted = (providerId: string, tenderId: string) => {
    sendNotification(
        providerId,
        'Offer Accepted!',
        `Your offer for tender #TND-${tenderId.slice(0, 8)} has been accepted.`,
        { tenderId, type: 'OFFER_ACCEPTED' }
    );
};
