import { reconcileClaims } from "../services/reconcile-service";
import { Claim } from "../types/Claim";
import { Invoice } from "../types/Invoice";
import { Patient } from "../types/Patient";
import { Reconciliation } from "../types/Reconciliation";

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
        const existingIds = new Set(this.invoices.map(i => i.invoice_id));
        const filtered = newInvoices.filter(i => !existingIds.has(i.invoice_id));

        if (filtered.length === 0) {
            console.log("No new invoices to add — all duplicates ignored.");
            return;
        }

        this.invoices.push(...filtered);
        this.recalculate();
        console.log(`Added ${filtered.length} new invoices`);
    }

    setPaitients(patients: Patient[]) {
        this.patients = patients;
    }

    getClaims() {
        return this.claims;
    }

    getInvoices() {
        return this.invoices;
    }

    getPaitients() {
        return this.patients;
    }

    getReconciliation(page: number, limit: number) {
        const start = (page - 1) * limit;
        const end = start + limit;
        return this.reconciliation.slice(start, end);
    }

    getSummary() {
        const summary = {
            totalClaims: this.reconciliation.length,
            balanced: this.reconciliation.filter(r => r.status === "BALANCED").length,
            overpaid: this.reconciliation.filter(r => r.status === "OVERPAID").length,
            underpaid: this.reconciliation.filter(r => r.status === "UNDERPAID").length,
            na: this.reconciliation.filter(r => r.status === "N/A").length,
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