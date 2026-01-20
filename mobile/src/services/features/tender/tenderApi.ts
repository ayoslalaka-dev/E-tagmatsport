import api from '../../../lib/api';

// Types based on backend Tender entity
export type TenderStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TenderType = 'GROUPAGE' | 'FULL_TRUCK' | 'EXPRESS' | 'STANDARD' | 'AGROALIMENTAIRE';

export interface Tender {
    id: string;
    type: TenderType;
    origine: string;
    destination: string;
    date: string;
    statut: TenderStatus;
    description?: string;
    budget?: number;
    weight?: string;
    createdById: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTenderRequest {
    type?: TenderType;
    origine: string;
    destination: string;
    date: string;
    description?: string;
    budget?: number;
    weight?: string;
}

// API Functions
export const getTendersApi = async (): Promise<Tender[]> => {
    const response = await api.get<Tender[]>('/tenders');
    return response.data;
};

export const getTenderByIdApi = async (id: string): Promise<Tender> => {
    const response = await api.get<Tender>(`/tenders/${id}`);
    return response.data;
};

export const createTenderApi = async (data: CreateTenderRequest): Promise<Tender> => {
    const response = await api.post<Tender>('/tenders', data);
    return response.data;
};

export const updateTenderApi = async (id: string, data: Partial<CreateTenderRequest>): Promise<Tender> => {
    const response = await api.patch<Tender>(`/tenders/${id}`, data);
    return response.data;
};

export const deleteTenderApi = async (id: string): Promise<void> => {
    await api.delete(`/tenders/${id}`);
};
