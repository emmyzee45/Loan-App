// import Loan from "../data/Loan";
import Loans from "../data/Loan.js";

export const getAllLoans = async (req, res, next) => {
    try {
        const loans = await Loans;
        if (req.user.role !== "admin" && req.user.role !== "superAdmin") {
          loans.forEach(loan => delete loan.applicant.totalLoan);
        }
        res.json(loans);
    }catch(err) {
        next(err)
    }
}

export const getLoansBaseOnStatus = async (req, res, next) => {
    const status = req.query.status;
    console.log(status)
    try {
        const loans = await Loans.filter((state) => state.status === status)
        res.status(200).json(loans)
    }catch(err) {
        next(err)
    }
}

export const getLoansByUser = async (req, res, next) => {
    try {
        const userLoans = loans.filter(loan => loan.applicant.email === req.params.userEmail)
        res.status(200).json(userLoans.length ? userLoans : { loans: [] });
    }catch(err) {
        next(err)
    }
}

export const getExpiredLoans = async (req, res, next) => {
    try {
        const expiredLoans = await Loans.filter((loan) => new Date(loan.maturityDate) < new Date());
        res.status(200).json(expiredLoans);
    }catch(err) {
        next(err)
    }
}
export const deleteLoad = async (req, res, next) => {
    try {
        const index = Loans.findIndex(loan => loan.id === req.params.loanId);
        if (index === -1) return res.status(404).json({ message: "Loan not found" });

        Loans.splice(index, 1);
        res.json({ message: "Loan deleted successfully" });

    }catch(err) {
        next(err)
    }
}
