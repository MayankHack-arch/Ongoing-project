import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Signup from './pages/Signup.jsx'
import EmailVerification from './pages/EmailVerification.jsx';
import Login from './pages/Login.jsx';
import Homepage from './pages/Homepage.jsx';

function App() {
  return(
    <Router>
      <>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/email-verify" element={<EmailVerification/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Homepage/>}/>
      </Routes>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover pauseOnFocusLoss />
      </>
    </Router>
  )
}

export default App
