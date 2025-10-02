import {useState} from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
export default function Login(){
	const [username,setUsername] = useState("");
	const[password,setPassword]=useState("");
	const navigate = useNavigate();
	const handleLogin =async(e)=>{
		e.preventDefault();
		try{
			const res = await API.post("/login",{username,password});
			localStorage.setItem("token",res.data.token);
			alert("login succesfull")
			navigate("/stores")
		}
		catch(error){
			alert(error.response?.data?.error|| "login failed")
		}
	}
	const handleRedirect =()=>{
		navigate("/signup")

	}

	return (
		<div className="box">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					 type="text"
					 placeholder="username" 
					 value={username}
					 onChange ={(e)=>setUsername(e.target.value)}
					 required
				/>

				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
					required
				/>
			<button type="submit">Login</button>
			<button type="button" onClick={handleRedirect}>Register</button>
			</form>

		</div>
)}