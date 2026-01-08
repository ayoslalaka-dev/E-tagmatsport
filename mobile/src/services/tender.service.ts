import api from './api';

export const getTenders = async () => {
    const response = await api.get('/tenders');
    return response.data;
};

export const createTender = async (tenderData: any) => {
    const response = await api.post('/tenders', tenderData);
    return response.data;
};
