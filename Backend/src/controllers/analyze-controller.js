import { scraperWebSite } from "../services/scraper-service.js"
import { generateAnalysis } from "../services/ai-service.js";


export const analyzeController = async (req, res) => {
    try {

        const { adText = " ", url } = req.body;
        const adImage = req.file;
        
        if (!url?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Landing page URL is required",
            })
        }
        if (!adText?.trim() && !adImage) {
            return res.status(400).json({
                success: false,
                message: "Please provide either ad text or an ad image.",
            })
        }

        const pageData = await scraperWebSite(url);
        const analysis = await generateAnalysis(adText, adImage, pageData);
        res.json({
            success: true,
            data: analysis,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
