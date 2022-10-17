import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

const LogOut = () => {
    const { logOut } = useContext(UserContext);

    const fetchLogOut = () => {
        fetch(`http://localhost:3030/users/logout`)
            .then((resp) => {
                if (!resp.status === 204) {
                    throw Error();
                }
                logOut();
            })
            .catch(() => alert("Unsuccesful logout!"));
    };

    useEffect(() => {
        fetchLogOut();
    }, []);

    return null;
};

export default LogOut;
