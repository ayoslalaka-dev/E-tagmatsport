import { useQuery } from '@tanstack/react-query';
import { getTendersApi, getTenderByIdApi, Tender } from './tenderApi';

// List all tenders
export const useTendersQuery = () => {
    return useQuery<Tender[]>({
        queryKey: ['tenders'],
        queryFn: getTendersApi,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

// Get single tender by ID
export const useTenderQuery = (id: string) => {
    return useQuery<Tender>({
        queryKey: ['tender', id],
        queryFn: () => getTenderByIdApi(id),
        enabled: !!id,
    });
};
