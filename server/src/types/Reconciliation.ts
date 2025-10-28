export enum ReconciliationStatus {
  BALANCED = 'BALANCED',
  OVERPAID = 'OVERPAID',
  UNDERPAID = 'UNDERPAID',
  NA = 'N/A'
}

export interface Reconciliation {
  claim_id: string;
  patient_id: string;
  charges_amount: number;
  patient_name: string;
  total_invoices: number | null;
    status: ReconciliationStatus;
}