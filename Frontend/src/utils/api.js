import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_PATH}`,
    
});

export const generateAnalysis = async (formdata) => {
    try {
        const res = await api.post("/analyze", formdata,);
        console.log("Api responce", res.data);
        return res;
    } catch (err) {
        console.log(err);
    }

}