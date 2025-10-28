import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Pagination,
  Skeleton,
} from '@mui/material';
import type { PaginatedResponse } from '../types/reconciliation';

interface ReconciliationTableProps {
  data: PaginatedResponse | null;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'BALANCED':
      return 'success';
    case 'OVERPAID':
      return 'error';
    case 'UNDERPAID':
      return 'warning';
    default:
      return 'default';
  }
};

const ReconciliationTable = ({ data, isLoading, onPageChange }: ReconciliationTableProps) => {
  if (isLoading) {
    return (
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Claim ID</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell align="right">Charges</TableCell>
                <TableCell align="center">Invoices</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton width={120} /></TableCell>
                  <TableCell><Skeleton width={120} /></TableCell>
                  <TableCell><Skeleton width={150} /></TableCell>
                  <TableCell><Skeleton width={80} /></TableCell>
                  <TableCell><Skeleton width={40} /></TableCell>
                  <TableCell><Skeleton width={80} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No reconciliation data available
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Claim ID</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell align="right">Charges</TableCell>
                <TableCell align="center">Invoices</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row) => (
                <TableRow key={row.claim_id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {row.claim_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {row.patient_id}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.patient_name}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={500}>
                      ${row.charges_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.total_invoices !== null 
                        ? row.total_invoices.toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })
                        : 'N/A'} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.status} 
                      color={getStatusColor(row.status) as any}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, px: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {((data.page - 1) * data.limit) + 1} to {Math.min(data.page * data.limit, data.total)} of {data.total} entries
        </Typography>
        <Pagination
          count={data.totalPages}
          page={data.page}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default ReconciliationTable