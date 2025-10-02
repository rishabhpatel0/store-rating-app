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

app.get("/users",async(req,res)=>{
	try{
		const result = await pool.query("SELECT id,username,role FROM users")
		res.json(result.rows)
	}
	catch(error){
		res.status(500).json({error:error.message})
	}
})
app.get("/stores",async(req,res)=>{
	try{
		const result = await pool.query("SELECT * FROM stores")
		res.json(result.rows)
	}
	catch(error){
		res.status(500).json({error:error.message})
	}
})
app.get("/rating",async(req,res)=>{
	try{
		const result = await pool.query("SELECT * FROM rating")
		res.json(result.rows)
	}
	catch(error){
		res.status(500).json({error:error.message})
	}
})

app.post("/register", async (req, res) => {
  const {username,password,role } =req.body;
  if (!username||!password||!role) {
    return res.status(400).json({ error: "all feild are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role",
      [username, hashedPassword, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login",async(req,res)=>{
	const {username,password} =req.body;
	if(!username||!password)
		return res.status(404).json({error:"all feild are required"})
	try{
		const userResult = await pool.query(
			"SELECT * FROM users WHERE username = $1",[username]
			)
		const user = userResult.rows[0];
		if(!user)
			return res.status(404).json({error:"not found"})
		const check = await bcrypt.compare(password,user.password)
		if(!check)
			return res.status(400).json({error:"invlaid password"})

		const token = jwt.sign({
			id:user.id,
			username:user.username,
			role:user.role
		},"secret123",
		{expiresIn:"1h"}
		)
		res.json({token})
	}
	catch(error){
		res.status(500).json({error:error.message})
	}
})
app.listen(3000,()=>{
	console.log("server running on port 3000")
})