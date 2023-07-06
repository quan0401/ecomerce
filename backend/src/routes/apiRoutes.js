const express = require("express");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.get("/get-token", (req, res, next) => {
  try {
    const token = req.cookies["access_token"];
    if (!token) res.status(401).json({ EC: 1, EM: "JWT must be provided" });
    const decoded = verify(token, process.env.JWT_SECRET_KEY);
    if (decoded)
      res.status(200).send({
        token: decoded.firstName + " " + decoded.lastName,
        isAdmin: decoded.isAdmin,
      });
  } catch (error) {
    next(error);
  }
});

app.get("/clear-token", (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .send({ EC: 0, EM: "Cookie is cleared" });
  } catch (error) {
    next(error);
  }
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

module.exports = app;
