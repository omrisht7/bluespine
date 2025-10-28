import { Request, Response, NextFunction } from "express";
import { dataStore } from "../data/data-store";
import { Invoice } from "../types/Invoice";
import { parseCSV } from "../utils/csv-parser";

export const uploadInvoicesCsv = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const buffer = req.file?.buffer;
    if (!buffer) return res.status(400).send("No file uploaded");

    const invoices = await parseCSV<Invoice>(buffer);
    dataStore.addInvoices(invoices);

    res.json({ message: `Loaded ${invoices.length} invoices and recalculated reconciliation.` });
  } catch (err) {
    next(err);
  }
};