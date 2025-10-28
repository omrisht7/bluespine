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

    const total = dataStore.getSummary().totalClaims;
    const totalPages = Math.ceil(total / limit);
    const safePage = Math.min(page, totalPages || 1);
    const data = dataStore.getReconciliation(safePage, limit);

    res.json({
        page: safePage,
        limit,
        total,
        totalPages,
        data,
    });
}
