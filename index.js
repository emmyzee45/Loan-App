import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth.js";
import loanRoute from "./routes/loan.js";

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);
app.use("/loans", loanRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});


app.listen(process.env.PORT, () => {
  console.log("Backend server is running!")
})