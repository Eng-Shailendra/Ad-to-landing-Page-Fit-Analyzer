import express from "express";
import cors from "cors";

import analyzeRouter from "./routes/analyze-routes.js";
const app = express();



app.use(cors())
app.use(express.json())

app.use("/api/v1", analyzeRouter)


export default app;