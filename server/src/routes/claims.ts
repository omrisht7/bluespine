import { Router } from "express";
import { uploadFile } from "../utils/multer";
import { uploadClaimsCsv } from "../controllers/claims-controller";

const claimsRouter = Router();

claimsRouter.post('/' , uploadFile.single('file'), uploadClaimsCsv);

export default claimsRouter;