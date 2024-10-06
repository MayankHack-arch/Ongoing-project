import React from 'react';
import {Link} from 'react-router-dom';

function EmailVerification() {
  return (
    <div className='verification-container'>
        <h2>Email verification</h2>
        <p>A verification email is sent to your e-mail address. Please check your inbox and click on the verification link to activate your account.</p>
        <p>if you don't see email, check your spam folder</p>
        <p className='link-p'>if verified <Link to="/login"> go to login page</Link></p>
        <p className='link-p'>If you want to re-type details <Link to="/signup">go to signup</Link></p>
    </div>
  )
}

export default EmailVerification;