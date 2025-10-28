import { Request, Response } from "express";
import { dataStore } from "../data/data-store";

export const getSummary = (req: Request, res: Response) => {
    const summary = dataStore.getSummary();
    res.json(summary);
}

export const getReconciliation = (req: Request, res: Response) => {
    const query = req.query as Record<string, string>;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 50;
    const status = query.status || 'ALL';
    const result = dataStore.getReconciliationFiltered(page, limit, status);
    res.json(result);
}
