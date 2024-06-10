import express from "express"
import router from "./routes.js"
import dotenv from "dotenv"
import { connectToMongoDB } from "./database.js";
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app=express();
app.use(express.json())

app.use(express.static(path.join(__dirname,"build")))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build/index.html"))
})
//Middlerwares
app.use("/api",router);

const port = process.env.PORT || 5000;

async function startServer(){
    await connectToMongoDB();
    app.listen(port,()=>{
        console.log(`Server is listening on http : //localhost:${port}`)
    })
}
startServer();