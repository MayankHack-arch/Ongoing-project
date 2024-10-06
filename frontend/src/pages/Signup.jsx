import React, { useState } from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Signup() {
  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const Navigate = useNavigate();

  const handleSignup = async(e)=>{
    e.preventDefault();
    if(!firstName || !lastName || !email || !password){
      toast.error("please fill out all fields")
      return;
    }
    try{
      const response = await axios.post("http://localhost:4001/api/user/signup",{firstName, lastName, email, password},{withCredentials: true, headers:{"Content-type":"application/json"}});
      if(response.status == 201){
        toast.success(response.data.message);
        Navigate('/email-verify');
      }
    }catch(error){
      console.error('Error:', error.response);
      toast.error(error.response.data.message || "An error occured")
    }
  }
  return (
    <div className='signup-page'>
        <form onSubmit={handleSignup}>
            <h2 className='main-heading'>Signup</h2>
            <input type='text' placeholder='first name' className='input-credential' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <input type='text' placeholder='last name' className='input-credential' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <input type='text' placeholder='email' className='input-credential' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='text' placeholder='password'className='input-credential' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <p className='link-p'>Already registered <Link to='/login'>Login now</Link></p>
            <button type='submit' className='submit-signup'>Signup</button>
        </form>
    </div>
  )
}

export default Signup;