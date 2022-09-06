import { useReducer } from "react"
import AuthContext from "../context/AuthContext"
import AuthReducer from "../reducers/AuthReducer";

//initial state
export const INITIAL_STATE = {
    isUserLoggedIn : false,
    user : {}
}
//create provider
const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer( AuthReducer, INITIAL_STATE);
    return(
        <AuthContext.Provider
        
            value = {{
                isUserLoggedIn : state.isUserLoggedIn,
                user : state.user,
                dispatch
            }}
        
        >
            { children }
        </AuthContext.Provider>
    )
}

//export auth context provider
export default AuthContextProvider;