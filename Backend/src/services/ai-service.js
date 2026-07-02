import { GoogleGenAI } from "@google/genai"
import { promptService, geminiResponseSchema } from "./prompt-service.js"



export const generateAnalysis = async (ad, pageData) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


    const prompt = await promptService(ad, pageData);

    try {
        const responce = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: geminiResponseSchema,
            }
        })
        return await JSON.parse(responce.text);

    }
    catch (err) {
        console.log(err);
        throw new Error("Ai can't generate analysis")
    }

}

