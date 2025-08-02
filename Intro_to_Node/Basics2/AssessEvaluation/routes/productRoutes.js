const express = require("express");
const mongoose = require("mongoose");
const { getAllProducts, addProduct, updateProduct, deleteProduct, productsbyPrice } = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/getAllProducts",getAllProducts);
productRouter.post("/addProduct",addProduct)
productRouter.patch("/updateProduct/:id",updateProduct);
productRouter.delete("/deleteProduct/:id",deleteProduct);
productRouter.get("/getProductbyPrice",productsbyPrice);
module.exports = productRouter;