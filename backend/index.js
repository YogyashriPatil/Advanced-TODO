import express from "express";
// import cors from "cors";
// import dotenv from dotenv;
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
app.get("/signin",(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    

})

app.get("/",(req,res) => {
    
})

app.get("/",(req,res) => {
    
})

app.listen(process.env.PORT, (req,res) => {
    console.log(`Listening on the ${process.env.PORT}`);
})