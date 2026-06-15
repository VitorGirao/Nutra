import express from "express";
import cors from "cors";
import postRouter from "./routers/PostRouter.js";
import nutricionistaRouter from "./routers/NutricionistaRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(postRouter);
app.use(nutricionistaRouter);

app.use(errorHandler);

export default app;
