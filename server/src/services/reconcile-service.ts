import { dataStore } from "../data/data-store";
import { Claim } from "../types/Claim";
import { Invoice } from "../types/Invoice";
import { Reconciliation, Status } from "../types/Reconciliation";

export function reconcileClaims(
    claims: Claim[],
    invoices: Invoice[],
): Reconciliation[] {
    const invoiceMap = new Map<string, number>();
    const patientMap = new Map(dataStore.getPaitients().map(p => [p.patient_id, p.name]));

    for (const invoice of invoices) {
        const total = invoiceMap.get(invoice.claim_id) || 0;
        invoiceMap.set(invoice.claim_id, total + invoice.transaction_value);
    }

    return claims.map((claim) => {
        const total = invoiceMap.get(claim.claim_id);
        let status: Status;

        if (total === undefined) status = "N/A";
        else if (total === claim.charges_amount) status = "BALANCED";
        else if (total > claim.charges_amount) status = "OVERPAID";
        else status = "UNDERPAID";

        return {
            claim_id: claim.claim_id,
            patient_id: claim.patient_id,
            charges_amount: claim.charges_amount,
            patient_name: patientMap.get(claim.patient_id) || "Unknown",
            total_invoices: total ?? null,
            status,
        };
    });
}