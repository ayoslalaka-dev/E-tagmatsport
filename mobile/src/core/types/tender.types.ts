export type TenderStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TenderType = 'GROUPAGE' | 'FULL_TRUCK' | 'EXPRESS' | 'STANDARD';

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
    createdBy?: {
        id: string;
        nom: string;
        email: string;
    };
    offers?: Offer[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Offer {
    id: string;
    prix: number;
    delai: string;
    commentaire?: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    tenderId: string;
    prestataireId: string;
    prestataire?: {
        id: string;
        nom: string;
    };
    createdAt?: string;
}

export interface CreateTenderData {
    type: TenderType;
    origine: string;
    destination: string;
    date: string;
    description?: string;
    budget?: number;
    weight?: string;
}

export interface CreateOfferData {
    tenderId: string;
    prix: number;
    delai: string;
    commentaire?: string;
}

export interface TenderStats {
    total: number;
    open: number;
    completed: number;
}
