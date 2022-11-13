import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { SITE_URL } from "../../urls";

const LogOut = () => {
    const { logOut } = useContext(UserContext);

    const fetchLogOut = () => {
        fetch(`${SITE_URL}/users/logout`)
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
