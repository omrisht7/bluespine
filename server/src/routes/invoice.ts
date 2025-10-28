import { Router } from "express";
import { uploadFile } from "../utils/multer";
import { uploadInvoicesCsv } from "../controllers/invoices-controller";

const invoicesRouter = Router();

invoicesRouter.post('/', uploadFile.single('file'), uploadInvoicesCsv);

export default invoicesRouter;