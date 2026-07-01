import axios from "axios";

export const generateAnalysis = async (formdata ) => {
    const res = await axios.post(`${import.meta.env.VITE_API_PATH}/analyze`, formdata,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    return res
}