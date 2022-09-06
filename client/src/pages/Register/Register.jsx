import React from 'react'
import { useState } from 'react';
import { RiFacebookBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import swal from 'sweetalert';
import '../Login/Login.scss';
import './Register.scss';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { createToast } from '../../utility/toast';

const Register = () => {

  // //create a toast
  // const createToast = (msg) => {
  //   return toast.error(msg);
  // }
// state for form field
  const [input, setInput] = useState({
    email : '',
    name : '',
    username : '',
    password : ''
  });

// handle input fields
  const handleInput = (e) => {
    setInput((prev) => ({...prev, [e.target.name] : e.target.value}));
  }
  
  //handle user register
  const handleUserRegister = async (e) => {
    e.preventDefault();
    try {
      if (!input.email || !input.name || !input.username || !input.password) {
        // swal("Danger!", "All fields are required!", "error");
        createToast('All fields are required!');
      }else{
        await axios.post('http://localhost:5050/api/user/register', input)
        .then(res => {
          setInput((prev) => ({
            email : '',
            name : '',
            username : '',
            password : ''
          }));
          console.log('success');
          // swal("Success!", "your account created successfully", "success");
          createToast('Your account created successfully');
        })
        .catch( error => {
          createToast('Account not found');
          console.log(error);
        })
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      
      <div className="login-wraper">
        <a href="#" className="register-logo-link">
          <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" className="login-logo" />
        </a>
        <span className="reg-text">Sign up to see photos and videos from your friends</span>
        <a className='login-with-fb-register' href="#"><RiFacebookBoxFill/> Log in with Facebook </a>
        <div className="divider">
          OR
        </div>

        <form onSubmit={handleUserRegister} className="login-form">
          <input name='email' value={input.email} onChange={handleInput} type="text" className="login-input" placeholder='Phone number or email' />
          <input name='name' value={input.name} onChange={handleInput} type="text" className="login-input" placeholder='Full Name' />
          <input name='username' value={input.username} onChange={handleInput} type="text" className="login-input" placeholder='username' />
          <input name='password' value={input.password} onChange={handleInput} type="password" className="login-input" placeholder='password' />

          <p className="reg-form-text">People who use our service may have uploaded your contact information to Instagram. <a href="#">Learn More</a></p>
          <p className="reg-form-text">By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a> .</p>
          <button className='login-submit'>Sign up</button>
        </form>

      </div>
      <div className="sign-up-wraper">
      <span className="sign-up-text">Have an account? <Link to="/login" className="sign-up-link">Log In</Link></span>
      </div>
      <div className="get-app-wraper">
        <span className="get-app-text">Get the app.</span>
        <div className="get-app-logo">
          <a href="#" className="logo-link">
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="" className="logo-image" />
          </a>
          <a href="#" className="logo-link">
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="" className="logo-image" />
          </a>
        </div>
      </div>
      <AuthFooter/>
    </div>
  )
}

export default Register;