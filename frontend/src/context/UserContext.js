import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const Context = createContext();

export function UserProvider({children }) {
    const { createPatient, authenticated, login } = useAuth();

    return (
        <Context.Provider value={{authenticated, createPatient, login}}> 
            {children}
        </Context.Provider>
    )
}

export default Context;