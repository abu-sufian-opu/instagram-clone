import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { createToast } from '../../utility/toast';

const Verify = () => {
    const params = useParams();
    const navigate = useNavigate();
    // console.log(params);
    
    //use effect
    useEffect( () => {
        axios.post('http://localhost:5050/api/user/verify', params)
        .then(res => {
          createToast('Account Activation successfully');
          navigate('/login');
        })
        .catch( error => {
          createToast('Account Activation failed');
        })
    });
    
  return (
    <div><h1>Verify your account</h1></div>
  )
}

export default Verify;