import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connect from "./config/db.js"
import authRoute from "./routes/auth.js";
import loanRoute from "./routes/loan.js";

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/loan", loanRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});


app.listen(process.env.PORT, () => {
  connect();
  console.log("Backend server is running!")
})