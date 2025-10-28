import { Box } from '@mui/material';
import type { ReconciliationSummary } from '../types/reconciliation';
import { useQuery } from '@tanstack/react-query';
import { Column } from '../layout/styles';
import { api } from '../config';
import SummaryCards from './SummaryCards';
import StatusChart from './StatusChart';
import ReconciliationTableContainer from './ReconciliationTableContainer';

const Dashboard = () => {
    const { data: summary, isLoading, isError, error } = useQuery<ReconciliationSummary>({
        queryKey: ["reconciliationSummary"],
        queryFn: async () => {
            const res = await fetch(api('/api/reconciled/summary'));
            if (!res.ok) throw new Error("Failed to fetch reconciliation summary");
            return res.json();
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError || !summary) return <div>Error: {(error as Error).message}</div>;

    return (
        <Column sx={{ gap: 4, px: 1, pb: 4 }}>
            <SummaryCards summary={summary} />

            <Box sx={{ display: 'flex', gap: 4, mb: 1, alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                    <StatusChart summary={summary} />
                </Box>
            </Box>

            <Box sx={{ mt: 2, px: 0 }}>
                <ReconciliationTableContainer />
            </Box>
        </Column>
    );
};

export default Dashboard;