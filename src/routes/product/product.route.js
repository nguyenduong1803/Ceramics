import * as productController from "../../controllers/product.controller";
import express from "express";
const productRoute = express.Router();

productRoute.post("/create", productController.create);
productRoute.post("/update/:id", productController.update);
productRoute.delete("/remove/:id", productController.remove);
productRoute.get("/", productController.read);
productRoute.get("/get-sale", productController.getSaleProduct);
productRoute.get("/:id", productController.getBuyId);

export default productRoute;
