import * as categoryController from "../../controllers/category.controller";
import express from "express";

const categoryRoute = express.Router();

categoryRoute.post("/create", categoryController.create);
categoryRoute.put("/update/:id", categoryController.update);
categoryRoute.delete("/remove/:id", categoryController.remove);
categoryRoute.get("/", categoryController.read);
categoryRoute.get("/:id", categoryController.findOne);

export default categoryRoute;
