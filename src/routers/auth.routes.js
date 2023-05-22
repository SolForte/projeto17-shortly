import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { logout, signIn, signUp } from "../controllers/auth.controller.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);
authRouter.post("/logout", logout);

export default authRouter;
