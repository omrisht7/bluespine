import { faker } from "@faker-js/faker";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
import { dataStore } from "./data-store";

const NUM_PATIENTS = 2000;
const MIN_CLAIMS_PER_PATIENT = 10;
const MAX_CLAIMS_PER_PATIENT = 100;
const MAX_INVOICES_PER_CLAIM = 4;

export const initializeData = async () => {
    console.log("Generating patients...");
    const patients = [];
    const claims = [];
    const invoices = [];

    for (let i = 1; i <= NUM_PATIENTS; i++) {
        const patient = {
            patient_id: i.toString(),
            name: faker.person.fullName(),
        };
        patients.push(patient);

        const numClaims = faker.number.int({ min: MIN_CLAIMS_PER_PATIENT, max: MAX_CLAIMS_PER_PATIENT });

        for (let j = 0; j < numClaims; j++) {
            const claimId = faker.string.uuid();
            const claim = {
                claim_id: claimId,
                patient_id: patient.patient_id,
                date_of_service: faker.date.past({ years: 2 }).toISOString().split("T")[0],
                charges_amount: Number(faker.number.float({ min: 100, max: 5000 }).toFixed(2)),
            };
            claims.push(claim);

            const numInvoices = faker.number.int({ min: 0, max: MAX_INVOICES_PER_CLAIM });
            
            for (let k = 0; k < numInvoices; k++) {
                const invoice = {
                    invoice_id: faker.string.uuid(),
                    claim_id: claimId,
                    transaction_value: Number(faker.number.float({ 
                        min: 50,
                        max: 2000 
                    }).toFixed(2)),
                };
                invoices.push(invoice);
            }
        }
    }

    console.log(`Generated:
- ${patients.length} patients
- ${claims.length} claims
- ${invoices.length} invoices`);

    if (!fs.existsSync("./data")) fs.mkdirSync("./data");

    const claimsCsvWriter = createObjectCsvWriter({
        path: "./data/claims.csv",
        header: [
            { id: "claim_id", title: "claim_id" },
            { id: "patient_id", title: "patient_id" },
            { id: "date_of_service", title: "date_of_service" },
            { id: "charges_amount", title: "charges_amount" },
        ],
    });

    const invoicesCsvWriter = createObjectCsvWriter({
        path: "./data/invoices.csv",
        header: [
            { id: "invoice_id", title: "invoice_id" },
            { id: "claim_id", title: "claim_id" },
            { id: "transaction_value", title: "transaction_value" },
        ],
    });

    // Save patients to JSON file
    fs.writeFileSync("./data/patients.json", JSON.stringify(patients, null, 2));

    await claimsCsvWriter.writeRecords(claims);
    await invoicesCsvWriter.writeRecords(invoices);

    console.log("✅ Done! Files written to:");
    console.log("- ./data/patients.json");
    console.log("- ./data/claims.csv");
    console.log("- ./data/invoices.csv");
}
