import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/shorten.schema.js";
import {
  deleteUrlById,
  getUrlById,
  openShortUrlById,
  shortenUrl,
} from "../controllers/urls.controller.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), shortenUrl);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", openShortUrlById);
urlsRouter.delete("/urls/:id", deleteUrlById);

export default urlsRouter;
