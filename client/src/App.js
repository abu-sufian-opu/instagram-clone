import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import './app.scss';
import AuthenticateUser from "./middlewares/AuthenticateUser";
import AuthRedirectUser from "./middlewares/AuthRedirectUser";
import Cookies from 'js-cookie'
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import LoadingBar from 'react-top-loading-bar'
import LoaderContext from "./context/LoaderContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToast } from "./utility/toast";
import Verify from "./components/Verify/Verify";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";



function App() {

  //get auth context
  const {dispatch} = useContext(AuthContext);

  //get auth context
  const {loaderState, loaderDispatch} = useContext(LoaderContext);

  //get token
  const token = Cookies.get('token');

  //check logged in user
  useEffect( () => {
    try {
      axios.get('http://localhost:5050/api/user/me', {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then( res => {
        if (res.data.isVerified && token) {
          dispatch({type : 'LOGIN_USER_SUCCESS', payload : res.data});
        }else {
          createToast('Please verify your account');
          Cookies.remove('token');
        }
        
      })
      .catch(error => {
        dispatch({type : 'USER_LOGOUT'})
      });
    } catch (error) {
      
    }
  }, [token]);

  return (
    <>
        <LoadingBar
          color='#f11946'
          progress={loaderState}
          onLoaderFinished={() => loaderDispatch({type : 'LOADER_END'})}
        />
        
        <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <Routes>
        <Route path="/login" element={ <AuthRedirectUser><Login/></AuthRedirectUser> }/>
        <Route path="/register" element={ <AuthRedirectUser><Register/></AuthRedirectUser> }/>
        <Route path="/:id" element={ <AuthenticateUser><Profile/></AuthenticateUser>}/>
        <Route path="/" element={ <AuthenticateUser><Home/></AuthenticateUser> }/>
        <Route path="/user/:id/verify/:token" element={ <Verify/> }/>
        <Route path="/forgot-password" element={ <ForgotPassword/> }/>
        <Route path="/password-recover/:token" element={ <ResetPassword/> }/>
        
      </Routes>
    
    </>
  );
}

export default App;
