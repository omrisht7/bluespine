import { Card, CardContent, Grid, Typography } from "@mui/material";
import type { ReconciliationSummary } from "../types/reconciliation";
import { Description, TrendingDown, TrendingUp, Warning, CheckCircle } from '@mui/icons-material';
import { Row } from "../layout/styles";

const SummaryCards = ({ summary }: {
    summary: ReconciliationSummary;
}) => {
    const cards = [
        {
            title: 'Total Claims',
            value: summary.totalClaims,
            icon: Description,
            description: 'All reconciliation records',
            color: 'primary.main',
        },
        {
            title: 'Balanced',
            value: summary.balanced,
            icon: CheckCircle,
            description: `${summary.totalClaims > 0 ? Math.round((summary.balanced / summary.totalClaims) * 100) : 0}% of total`,
            color: 'success.main',
        },
        {
            title: 'Underpaid',
            value: summary.underpaid,
            icon: TrendingDown,
            description: `${summary.totalClaims > 0 ? Math.round((summary.underpaid / summary.totalClaims) * 100) : 0}% of total`,
            color: 'warning.main',
        },
        {
            title: 'Overpaid',
            value: summary.overpaid,
            icon: TrendingUp,
            description: `${summary.totalClaims > 0 ? Math.round((summary.overpaid / summary.totalClaims) * 100) : 0}% of total`,
            color: 'error.main',
        },
        {
            title: 'N/A Status',
            value: summary.na,
            icon: Warning,
            description: `${summary.totalClaims > 0 ? Math.round((summary.na / summary.totalClaims) * 100) : 0}% of total`,
            color: 'text.secondary',
        },
    ];

    return (
        <Grid container spacing={3} mb={8} sx={{padding: '0px 10px'}}>
            {cards.map((card) => (
                <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={card.title}>
                    <Card sx={{ transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                        <CardContent>
                            <Row sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                    {card.title}
                                </Typography>
                                <card.icon sx={{ fontSize: 20, color: card.color }} />
                            </Row>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {card.value.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {card.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default SummaryCards;