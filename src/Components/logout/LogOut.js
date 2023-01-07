import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { MONGO_URL } from "../../urls";

const LogOut = () => {
    const { logOut } = useContext(UserContext);

    const fetchLogOut = () => {
        fetch(`${MONGO_URL}/users/logout`)
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
