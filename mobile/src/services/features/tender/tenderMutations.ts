import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createTenderApi,
    updateTenderApi,
    deleteTenderApi,
    CreateTenderRequest
} from './tenderApi';

// Create tender mutation
export const useCreateTenderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTenderRequest) => createTenderApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tenders'] });
        },
    });
};

// Update tender mutation
export const useUpdateTenderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CreateTenderRequest> }) =>
            updateTenderApi(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tenders'] });
            queryClient.invalidateQueries({ queryKey: ['tender', variables.id] });
        },
    });
};

// Delete tender mutation
export const useDeleteTenderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTenderApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tenders'] });
        },
    });
};
