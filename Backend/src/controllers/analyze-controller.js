import { scraperWebSite } from "../services/scraper-service.js"

export const analyzeController = async (req, res) => {
    try {
        const { url } = req.body;
        console.log(url);
        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required",
            })
        }
        const pageData = await scraperWebSite(url);
        res.json({
            success: true,
            data: pageData,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
