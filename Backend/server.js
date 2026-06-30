import dotenv from "dotenv";
dotenv.config({ quiet: true });

import app from "./src/app.js";

const port = process.env.PORT || 8080


app.listen(port, () => {
    console.log(`Server started on port : ${port}, `)
})