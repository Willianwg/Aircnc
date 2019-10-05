import React, { useState } from "react"; 
import api from "../../services/api"; 

export default function Login (){ 
	
	const [ email, setEmail ] = useState("");
	
	async function handleSubmit (event){
		event.preventDefault ();
		
		const response= await api.post("/sessions", { email });
		
		const { _id } = response.data;
		
		localStorage.setItem("user",  _id);
		
	};
	
	return (
	
		<>
			<p>
				ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong>
			</p>
			<form onSubmit={ handleSubmit }>
				<label htmlfor="email">
					Email *
				</label>
				<input 
					type="email"
					 id="email" 
					value={ email }
					placeholder="seu melhor e-mail "
					onChange={ event => setEmail(event.target.value) }
					/>
					
				<button type="submit" 
				className="btn">
					Entrar
				</button>
			</form>
	</>
	);
} 