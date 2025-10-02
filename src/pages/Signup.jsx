import {useState} from "react";
import API from "../api/api";
import {useNavigate} from  "react-router-dom";
export default function Signup (){
	const [username ,setusername]=useState("");
	const [password,setPassword]=useState("");
	const [role,setRole]=useState("user");
	const navigate = useNavigate();

	const handleRegister =async(e)=>{
		e.preventDefault();
		try{
			const res = await API.post("/register",{username,password,role});
			alert("registered")
			navigate("/");
		}
		catch(error){
			alert("failed")
		}
	}

	return (
		<div className="box">
			<h2>SignUp</h2>
			<form  onSubmit={handleRegister}>
				<input 
					type="text" 
					placeholder="username"
					value={username}
					onChange={(e)=>setusername(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
					required
				/>
				<select value={role} onChange={(e)=>setRole(e.target.value)}>
					<option value="user">
						User
					</option> 
					<option value="store_owner">
						Store Owner
					</option>

				</select>
				<button type="submit">Signup</button>
			</form>
		</div>

	)
}