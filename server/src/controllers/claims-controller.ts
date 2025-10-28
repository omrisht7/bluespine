import { Request, Response } from "express";
import { Claim } from "../types/Claim";
import { dataStore } from "../data/data-store";
import { parseCSV } from "../utils/csv-parser";

export const uploadClaimsCsv = async (req: Request, res: Response) => {
  try {
    const buffer = req.file?.buffer;
    if (!buffer) return res.status(400).send("No file uploaded");

    const claims = await parseCSV<Claim>(buffer);
    dataStore.addClaims(claims);

    res.json({ message: `Loaded ${claims.length} claims and recalculated reconciliation.` });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};