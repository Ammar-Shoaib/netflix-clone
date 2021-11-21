import { createContext, useEffect, useReducer } from "react";
import MovieReducer from "./MovieReducer";

const initialState = {
    movies: [],
    isFetching:false,
    error:false,
}

export const MovieContext = createContext(initialState)

export const MovieContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(MovieReducer, initialState)

    return (
        <MovieContext.Provider value={{movies:state.movies, isFetching:state.isFetching, error:state.error, dispatch}}>
            {children}
        </MovieContext.Provider>
    )
}