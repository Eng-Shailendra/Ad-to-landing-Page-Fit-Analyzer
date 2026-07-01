import { Router } from "express";
import { analyzeController } from "../controllers/analyze-controller.js";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
});

const analyzeRouter = Router();

analyzeRouter.post("/analyze", upload.single("adImage"), analyzeController);

export default analyzeRouter;