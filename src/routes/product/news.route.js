import * as newsController from "../../controllers/new.controller";
import express from "express";

const newsRoute = express.Router();

newsRoute.post("/create", newsController.create);
newsRoute.put("/update/:id", newsController.update);
newsRoute.delete("/remove/:id", newsController.remove);
newsRoute.get("/", newsController.read);
newsRoute.get("/:id", newsController.findOne);

export default newsRoute;