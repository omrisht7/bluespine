import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ReconciledTable from './ReconciledTable';
import type { PaginatedResponse } from '../types/reconciliation';

const BASE_URL = 'http://localhost:4000';
const ITEMS_PER_PAGE = 10;

const STATUSES = ['ALL', 'BALANCED', 'OVERPAID', 'UNDERPAID', 'N/A'];

const ReconciliationTableContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState<string>('ALL');

    const { data, isLoading } = useQuery<PaginatedResponse>({
        queryKey: ['reconciled', currentPage, status],
        queryFn: async () => {
            const statusParam = status && status !== 'ALL' ? `&status=${encodeURIComponent(status)}` : '';
            const response = await fetch(
                `${BASE_URL}/api/reconciled?page=${currentPage}&limit=${ITEMS_PER_PAGE}${statusParam}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            return response.json();
        },
        staleTime: 1000 * 60 * 1,
        placeholderData: (previousData) => previousData,
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleStatusChange = (next: string) => {
        setStatus(next);
        setCurrentPage(1);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                        labelId="status-filter-label"
                        value={status}
                        label="Status"
                        onChange={(e) => handleStatusChange(e.target.value as string)}
                    >
                        {STATUSES.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <ReconciledTable
                data={data || null}
                isLoading={isLoading}
                onPageChange={handlePageChange}
            />
        </Box>
    );
}

export default ReconciliationTableContainer;