import React from 'react'
import { RiFacebookBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import AuthSlider from '../../components/AuthSlider/AuthSlider';
import '../Login/Login.scss';
import './AuthTemp.scss';


const AuthTemp = () => {
  return (
    <div className="login-container">
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-slider">
                    <AuthSlider/>
                </div>
                {/* <img src={mobile_img} alt="" /> */}
            </div>
            <div className="auth-right">
                <div className="login-wraper">
                    <a href="#" className="login-logo-link">
                    <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" className="login-logo" />
                    </a>

                    <form action="" className="login-form">
                    <input type="text" className="login-input" placeholder='Phone number, username or email' />
                    <input type="password" className="login-input" placeholder='password' />
                    <button className='login-submit'>Log In</button>
                    </form>

                    <div className="divider">
                    OR
                    </div>
                    <a className='login-with-fb' href="#"><RiFacebookBoxFill/> Log in with Facebook </a>
                    <a className='forgot-password' href="#"> Forgot password? </a>
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
            </div>
        </div>
     

      <AuthFooter/>

    </div>
  )
}

export default AuthTemp;