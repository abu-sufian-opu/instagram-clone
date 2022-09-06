import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {VscLock} from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import TopBar from '../TopBar/TopBar';
import './ForgotPassword.scss'


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState({
        type : '',
        msg  : '',
        status : false
    })

    //handle password recover
    const handlePasswordRecover = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:5050/api/user/recover-password', {email})
        .then(res => {
            setMsg({
                type : 'success',
                msg  : 'A Password recovery link sent',
                status : true
            });
        })
        .catch(error => {
            setMsg({
                type : 'danger',
                msg  : 'Invalid email',
                status : true
            });
        })

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
                
                    <form onSubmit={handlePasswordRecover}>
                        <div className="input-email my-3">
                            <input name='email' value={email} onChange={ e => setEmail(e.target.value)} type="text" placeholder='Email, Phone or username' />
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

export default ForgotPassword;