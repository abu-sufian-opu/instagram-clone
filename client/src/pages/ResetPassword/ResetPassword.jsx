import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {VscLock} from 'react-icons/vsc';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import TopBar from '../TopBar/TopBar';
import '../ForgotPassword/ForgotPassword.scss'
import './ResetPassword.scss'
import { createToast } from '../../utility/toast';


const ResetPassword = () => {

    //use prams
    const { token } = useParams();
    console.log(token);
    const navigate = useNavigate();

    //input state
    const [pass, setPass] = useState({
        password : '',
        cpassword : ''
    });
    console.log(pass);
    // const [cpassword, setCpassword] = useState('');

    const [msg, setMsg] = useState({
        type : '',
        msg  : '',
        status : false
    })

    //handle password
    const handlePassword = (e) => {
        setPass((prev) => ({...prev, [e.target.name] : e.target.value}));
    }
    
    //handle password recover
    const handlePasswordReset = async (e) => {
        e.preventDefault();

        try {
            //check password
            if (!pass.password || !pass.cpassword) {
                createToast('Please set a password')
            }else if (pass.password !== pass.cpassword) {
                createToast('password not match');
            }else{
                await axios.post('http://localhost:5050/api/user/reset-password', {token, password : pass.password})
                .then( res => {
                    // setMsg({
                    //     type : '',
                    //     msg  : '',
                    //     status : false
                    // });

                    createToast('Your password has been changed');
                    navigate('/login');
                    
                })
                .catch( error => {
                    createToast('Time out please try again');
                    console.log(error);
                })
            }

        } catch (error) {
            createToast("try again")
        }

    }

  return (
    <>
        <TopBar/>
        <section className='forgot-password-section'>
            <div className="forgot-password-container">
            { msg.status && <p className={`alert alert-${msg.type}`}>{msg.msg}</p>}
                <div className="forgot-icon">
                    <VscLock/>
                </div>
                <div className="trubble-login">
                    <span>Trouble Logging In?</span>
                    <p>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                </div>
                <div className="forgot-input-form">
                
                    <form onSubmit={handlePasswordReset}>
                        <div className="input-email my-3">
                            <input name='password' value={pass.password} onChange={ handlePassword } type="password" placeholder='New Password' />
                        </div>
                        <div className="input-email my-3">
                            <input name='cpassword' value={pass.cpassword} onChange={ handlePassword } type="password" placeholder='Confirm New Password' />
                        </div>
                        <div className="send-link my-3">
                            <button type='submit'>Send Login Link</button>
                        </div>
                    </form>
                </div>
                <div className="divider">
                    <span>OR</span>
                </div>
                <div className="create-new-acoount">
                    <Link to="/register">Create New Account</Link>
                </div>
                <div className="back-login">
                    <Link to="/login">Back To Login</Link>
                </div>
            </div>
        </section>
        <AuthFooter/>
    </>
  )
}

export default ResetPassword;