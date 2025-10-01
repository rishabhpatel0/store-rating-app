import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pkg from "pg";

dotenv.config();
const app =express();
app.use(express.json());
app.use(cors());
const{Pool} =pkg;
//Postgres connection

const pool = new Pool({
	user:process.env.DB_USER,
	host:process.env.DB_HOST,
	database:process.env.DB_NAME,
	password:process.env.DB_PASS,
	port:5432,
})

app.get("/",(req,res)=>{
	res.send("backedn is running")
})
	
app.listen(3000,()=>{
	console.log("server running on port 3000")
})