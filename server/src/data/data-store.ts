import { reconcileClaims } from "../services/reconcile-service";
import { Claim } from "../types/Claim";
import { Invoice } from "../types/Invoice";
import { Patient } from "../types/Patient";
import { Reconciliation, ReconciliationStatus } from "../types/Reconciliation";

class DataStore {
    private patients: Patient[] = [];
    private claims: Claim[] = [];
    private invoices: Invoice[] = [];
    private reconciliation: Reconciliation[] = [];
    private lastUpdated: Date | null = null;

    addClaims(newClaims: Claim[]) {
        const existingClaimsIds = new Set(this.claims.map(c => c.claim_id));
        const filtered = newClaims.filter(c => !existingClaimsIds.has(c.claim_id));

        if (filtered.length === 0) {
            return;
        }

        this.claims.push(...filtered);
        this.recalculate();
        console.log(`Added ${filtered.length} new claims`);
    }

    addInvoices(newInvoices: Invoice[]) {
        try {
            const CHUNK_SIZE = 10000;
            const existingIds = new Set(this.invoices.map(i => i.invoice_id));
            
            let filtered: Invoice[] = [];
            for (let i = 0; i < newInvoices.length; i += CHUNK_SIZE) {
                const chunk = newInvoices.slice(i, i + CHUNK_SIZE);
                const filteredChunk = chunk.filter(i => !existingIds.has(i.invoice_id));
                filtered.push(...filteredChunk);
            }

            if (filtered.length === 0) {
                console.log("No new invoices to add — all duplicates ignored.");
                return;
            }

            for (let i = 0; i < filtered.length; i += CHUNK_SIZE) {
                const chunk = filtered.slice(i, i + CHUNK_SIZE);
                this.invoices.push(...chunk);
            }

            this.recalculate();
            console.log(`Added ${filtered.length} new invoices`);
        } catch (error) {
            console.error('Error in addInvoices:', error);
            throw error;
        }
    }

    setPatients(patients: Patient[]) {
        this.patients = patients;
        console.log(`Set ${patients.length} patients in data store`);
    }

    getClaims() {
        return this.claims;
    }

    getInvoices() {
        return this.invoices;
    }

    getPatients() {
        return this.patients;
    }

    getReconciliation(page: number, limit: number) {
        const start = (page - 1) * limit;
        const end = start + limit;
        return this.reconciliation.slice(start, end);
    }

    getReconciliationFiltered(page: number, limit: number, status?: string) {
        const filtered = status && status !== 'ALL'
            ? this.reconciliation.filter(r => r.status.toLowerCase() === status.toLowerCase())
            : this.reconciliation;

        const total = filtered.length;
        const totalPages = Math.ceil(total / limit) || 1;
        const safePage = Math.min(Math.max(page, 1), totalPages);
        const start = (safePage - 1) * limit;
        const end = start + limit;

        return {
            page: safePage,
            limit,
            total,
            totalPages,
            data: filtered.slice(start, end),
        };
    }

    getSummary() {
        const summary = {
            totalClaims: this.reconciliation.length,
                balanced: this.reconciliation.filter(r => r.status === ReconciliationStatus.BALANCED).length,
                overpaid: this.reconciliation.filter(r => r.status === ReconciliationStatus.OVERPAID).length,
                underpaid: this.reconciliation.filter(r => r.status === ReconciliationStatus.UNDERPAID).length,
                na: this.reconciliation.filter(r => r.status === ReconciliationStatus.NA).length,
            lastUpdated: this.lastUpdated,
        };
        return summary;
    }

    private recalculate() {
        this.reconciliation = reconcileClaims(this.claims, this.invoices);
        this.lastUpdated = new Date();
    }

    clear() {
        this.claims = [];
        this.invoices = [];
        this.reconciliation = [];
        this.lastUpdated = null;
    }
}

export const dataStore = new DataStore();