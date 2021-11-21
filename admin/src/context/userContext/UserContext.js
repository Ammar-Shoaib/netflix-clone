import { createContext, useEffect, useReducer } from "react";
import UserReducer from "./UserReducer";

const initialState = {
    users: [],
    isFetching:false,
    error:false,
}

export const UserContext = createContext(initialState)

export const UserContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(UserReducer, initialState)

    return (
        <UserContext.Provider value={{users:state.users, isFetching:state.isFetching, error:state.error, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}