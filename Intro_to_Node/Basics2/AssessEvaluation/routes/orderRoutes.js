const mongoose = require("mongoose");
const express = require("express");
const { getOrders, addOrder, deleteOrder } = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.get("/getAllOrders/:id",getOrders);
orderRouter.post("/addOrder",addOrder);
orderRouter.delete("/deleteOrder/:id",deleteOrder)
module.exports = orderRouter;