export type Status = "BALANCED" | "OVERPAID" | "UNDERPAID" | "N/A";

export interface Reconciliation {
  claim_id: string;
  patient_id: string;
  charges_amount: number;
  patient_name: string;
  total_invoices: number | null;
  status: Status;
}

export interface ReconciliationSummary {
  totalClaims: number;
  balanced: number;
  overpaid: number;
  underpaid: number;
  na: number;
  lastUpdated: string;
}

export interface PaginatedResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Reconciliation[];
}
