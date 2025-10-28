import { Box, Card, CardContent, Typography } from "@mui/material";
import type { ReconciliationSummary } from "../types/reconciliation";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = {
    BALANCED: '#10b981',
    OVERPAID: '#ef4444',
    UNDERPAID: '#f59e0b',
    'N/A': '#94a3b8',
};

const StatusChart = ({ summary }: { summary: ReconciliationSummary}) => {
    const data = [
        { name: 'Balanced', value: summary.balanced, color: COLORS.BALANCED },
        { name: 'Overpaid', value: summary.overpaid, color: COLORS.OVERPAID },
        { name: 'Underpaid', value: summary.underpaid, color: COLORS.UNDERPAID },
        { name: 'N/A', value: summary.na, color: COLORS['N/A'] },
    ].filter((item) => item.value > 0);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Status Distribution
                </Typography>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent as any * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            {/* <Tooltip /> */}
                            {/* <Legend /> */}
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}

export default StatusChart