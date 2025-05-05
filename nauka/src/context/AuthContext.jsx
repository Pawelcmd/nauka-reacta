import { createContext, useReducer, useEffect } from "react";
import { authReducer, initialState } from "../reducers/AuthReducer";
import { AUTH_ACTIONS } from "../reducers/AuthReducer";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = JSON.parse(localStorage.getItem("userData"));

        if(storedToken && storedUser) {
            dispatch({
                type: AUTH_ACTIONS.LOAD_USER_FROM_STORAGE,
                payload: {
                    token: storedToken,
                    user: storedUser
                }
            })
        }
    }, [])

    const login = (user, token) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
        dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: user
        });
    };
    
    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };
    

    return (
        <AuthContext.Provider value={{
            user: state.user,
            token: state.token,
            isLoading: state.isLoading,
            error: state.error,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;