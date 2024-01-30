import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const Context = createContext();

export function UserProvider({children }) {
    const { createPatient } = useAuth();

    return (
        <Context.Provider value={{createPatient}}> 
            {children}
        </Context.Provider>
    )
}

export default Context;