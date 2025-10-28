import { Router } from "express";
import { getReconciliation, getSummary } from "../controllers/reconcsiliation-controller";

const reconciledRouter = Router();

reconciledRouter.get('/', getReconciliation);
reconciledRouter.get('/summary', getSummary);

export default reconciledRouter;