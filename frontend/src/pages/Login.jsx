import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const handleLogin = async(e)=>{
    e.preventDefault();
    if(!email || !password){
      toast.error("please fill out all fields")
      return;
    }
    try{
      const response = await axios.post("http://localhost:4001/api/user/login", {email, password}, {withCredentials: true, headers:{"Content-type":"application/json"}})
      if(response.status == 201){
        toast.success(response.data.message)
        Navigate("/");
      }
    }catch(error){
      console.error('Error:', error.response)
      toast.error(error.response.data.message || "An error occured")
    }
  }

  return (
    <div className='login-page'>
      <h2 className='main-heading'>Login</h2>
      <form onSubmit={handleLogin}>
        <input type='text' className='input-credential' placeholder='E mail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='text' className='input-credential' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <p className='link-p'>Not registered <Link to='/signup'>Signup now</Link></p>
        <button type='submit' className='submit-signup'>Signup</button>
      </form>
    </div>
  )
}

export default Login