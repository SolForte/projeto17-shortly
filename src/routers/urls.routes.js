import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/shorten.schema.js";
import { getUrlById, shortenUrl } from "../controllers/urls.controller.js";


const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), shortenUrl)
urlsRouter.get("/urls/:id", getUrlById)

export default urlsRouter;
