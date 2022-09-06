import { useReducer } from "react"
import LoaderContext from "../context/LoaderContext";
import LoaderReducer from "../reducers/LoaderReducer";

//initial state
export const INITIAL_STATE = 0;

//create provider
const LoaderContextprovider = ({ children }) => {

    const [loaderState, loaderDispatch] = useReducer( LoaderReducer, INITIAL_STATE);
    return(
        <LoaderContext.Provider
        
            value = {{
                loaderState,
                loaderDispatch
            }}
        
        >
            { children }
        </LoaderContext.Provider>
    )
}

//export auth context provider
export default LoaderContextprovider;