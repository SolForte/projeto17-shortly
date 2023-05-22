import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/shorten.schema.js";
import { shortenUrl } from "../controllers/urls.controller.js";


const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), shortenUrl)