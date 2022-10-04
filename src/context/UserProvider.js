import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.accessToken) {
            return
        }
        
        localStorage.setItem("userInfo", JSON.stringify(user));
        navigate(`/`);
    }, [user])

    // TO DO WHEN THE PAGE IS INITIALLY LOADED useEffect()



    return (
        <UserContext.Provider
            value={{
                user,
                setUser: obj => setUser(obj)
            }}
        >
            {children}
        </UserContext.Provider>
    )
}