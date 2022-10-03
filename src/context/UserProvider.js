import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext({ user: {}, setUser })

export const UserProvider = () => {
    const [user, setUser] = useState()
    const history = useHistory()

    useEffect(() => {
        if (!user.token) {
            return
        }
        scrollToTop()

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