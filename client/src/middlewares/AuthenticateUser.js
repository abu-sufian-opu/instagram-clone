import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


//create Authenticate
const AuthenticateUser = ({ children }) => {
    
    const { isUserLoggedIn } = useContext(AuthContext);
    return isUserLoggedIn ? children : <Navigate to='/login'/>
}

//export Authenticate Middleware
export default AuthenticateUser;