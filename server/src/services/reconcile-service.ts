import { dataStore } from "../data/data-store";
import { Claim } from "../types/Claim";
import { Invoice } from "../types/Invoice";
import { Reconciliation, ReconciliationStatus } from "../types/Reconciliation";

export function reconcileClaims(
    claims: Claim[],
    invoices: Invoice[],
): Reconciliation[] {
    const CHUNK_SIZE = 10000;
    const invoiceMap = new Map<string, number>();
    const patientMap = new Map(dataStore.getPatients().map(p => [p.patient_id, p.name]));
    
    console.log('Starting invoice processing...');
    for (let i = 0; i < invoices.length; i += CHUNK_SIZE) {
        const chunk = invoices.slice(i, i + CHUNK_SIZE);
        for (const invoice of chunk) {
            const total = invoiceMap.get(invoice.claim_id) || 0;
            const newTotal = Number((total + Number(invoice.transaction_value)).toFixed(2));
            invoiceMap.set(invoice.claim_id, newTotal);
        }
    }

    console.log('Starting claims processing...');
    let reconciled: Reconciliation[] = [];
    for (let i = 0; i < claims.length; i += CHUNK_SIZE) {
        const chunk = claims.slice(i, i + CHUNK_SIZE);
        const reconciledChunk = chunk.map((claim) => {
            const total = invoiceMap.get(claim.claim_id);
                let status: ReconciliationStatus;

                if (total === undefined) status = ReconciliationStatus.NA;
                else if (total === claim.charges_amount) status = ReconciliationStatus.BALANCED;
                else if (total > claim.charges_amount) status = ReconciliationStatus.OVERPAID;
                else status = ReconciliationStatus.UNDERPAID;

            return {
                claim_id: claim.claim_id,
                patient_id: claim.patient_id,
                charges_amount: claim.charges_amount,
                patient_name: patientMap.get(claim.patient_id) || "Unknown",
                total_invoices: total ?? null,
                status,
            };
        });
        reconciled.push(...reconciledChunk);
    }

    console.log('Reconciliation complete');
    return reconciled;
}