import { Router } from "express";
import claimsRouter from "./claims";
import invoicesRouter from "./invoice";
import reconciledRouter from "./reconcile";

const apiRouter = Router();

apiRouter.use('/claims', claimsRouter);
apiRouter.use('/invoices', invoicesRouter);
apiRouter.use('/reconciled', reconciledRouter);

export default apiRouter;