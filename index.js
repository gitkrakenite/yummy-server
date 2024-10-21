const express = require("express");
const cors = require("cors");
require("colors");
require("dotenv").config();

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const foodRouter = require("./routes/foodRoutes");
const orderRouter = require("./routes/orderRoutes");
const drinkRouter = require("./routes/drinkRoutes");
const feedBackRouter = require("./routes/feedbackRoutes");
const sendUsRouter = require("./routes/sendUsRoutes");
const receiptsRouter = require("./routes/receiptRoutes");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB connection
connectDB();

// routes
app.get("/", (req, res) => res.status(200).send("API WORKING WELL"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/drinks", drinkRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/feedback", feedBackRouter);
app.use("/api/v1/send-us", sendUsRouter);
app.use("/api/v1/receipts", receiptsRouter);

// listener
app.listen(PORT, console.log(`Server running on port: ${PORT}`));
