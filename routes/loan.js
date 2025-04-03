import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { deleteLoad, getAllLoans, getExpiredLoans, getLoansBaseOnStatus, getLoansByUser } from "../controllers/loan.js";

const router = express.Router();

router.get("/",authenticate, getAllLoans)
router.post("/",authenticate, getLoansBaseOnStatus);
router.get("/expired",authenticate, getExpiredLoans)
router.get("/:userEmail/get",authenticate, getLoansByUser)
router.delete("/:loanId/delete",[authenticate, authorize(["superAdmin"])], deleteLoad)

export default router;
