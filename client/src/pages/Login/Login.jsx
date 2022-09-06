import React from 'react'
import { RiFacebookBoxFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import './Login.scss'
import { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import LoaderContext from '../../context/LoaderContext';
import { createToast } from '../../utility/toast';


const Login = () => {
  //use auth context
  const {dispatch} = useContext(AuthContext);

  //use loader context
  const {loaderState, loaderDispatch} = useContext(LoaderContext);

  //use navigate
  const navigate = useNavigate();

  //form field state
  const [input, setInput] = useState({
    auth : '',
    password : ''
  });

  //handle input
  const handleInput = (e) => {
    setInput((prev)  => ({...prev, [e.target.name] : e.target.value}));
  }
  console.log(input);

  //handle user login
  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      if (!input.auth || !input.password) {
        createToast('All fields are required!');
      }else{
        await axios.post('http://localhost:5050/api/user/login', {email : input.auth, password : input.password})
        .then(res => {
          if(res.data.user.isVerified){
          cookie.set('token', res.data.token);
          dispatch({ type : 'LOGIN_USER_SUCCESS', payload : res.data.user});
          navigate('/');
          loaderDispatch({type : "LOADER_START"});
          }else {
            createToast('Please verify your account');
          }
          
        })
      }
    } catch (error) {
      createToast('wrong email or password')
    }
  }

  return (
    
    <div className="login-container">
      
      <div className="login-wraper">
        <a href="#" className="login-logo-link">
          <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" className="login-logo" />
        </a>

        <form onSubmit={handleUserLogin} className="login-form">
          <input name='auth' value={input.auth} onChange={handleInput} type="text" className="login-input" placeholder='Phone number, username or email' />
          <input name='password' value={input.password} onChange={handleInput} type="password" className="login-input" placeholder='password' />
          <button type='submit' className='login-submit'>Log In</button>
        </form>

        <div className="divider">
          OR
        </div>
        <a className='login-with-fb' href="#"><RiFacebookBoxFill/> Log in with Facebook </a>
        <Link className='forgot-password' to="/forgot-password"> Forgot password? </Link>
      </div>
      <div className="sign-up-wraper">
        <span className="sign-up-text">Don't have an account? <Link to="/register" className="sign-up-link">Sign up</Link></span>
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

export default Login;