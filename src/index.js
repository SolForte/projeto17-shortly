import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.routes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
