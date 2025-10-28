export type Status = 'BALANCED' | 'OVERPAID' | 'UNDERPAID' | 'N/A';

export interface Reconciliation {
  claim_id: string;
  patient_id: string;
  charges_amount: number;
  total_invoices: number | null;
  status: Status;
}