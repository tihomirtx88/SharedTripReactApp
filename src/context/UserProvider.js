import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({ user: {} })

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const history = useNavigate()

    useEffect(() => {
        if (!user.token) {AAswfDCASc
            return
        }
        
    }, [user])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}