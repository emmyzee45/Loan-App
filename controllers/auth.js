import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Staff from "../data/Staff.js";
import createError from "../middleware/errorHandler.js";
import Blacklist from "../data/Blacklist.js";


export const login = async (req, res, next) => {
    try {
        const { email } = req.body;
        const staff = Staff.find(user => user.email === email && user.password === req.body.password);
        if (!staff) return res.status(401).json({ message: "Invalid credentials" });

   
        const token = jwt.sign(
            {
            id: staff._id,
            email: staff.email,
            role: staff.role,
            name: staff.name,
            },
            process.env.JWT_KEY, 
            { expiresIn: "24h" }
        );
  
      const { password, ...info } = staff;
      res.status(200).json({token});
    } catch (err) {
      next(err);
    }
  };

  export const logout = async (req, res) => {
    const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
    Blacklist.push(token)
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  };