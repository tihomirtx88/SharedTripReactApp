import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AlertPopUpD from "../../context/AlertPopupD";
import { UserContext } from "../../context/UserProvider";
import { LOCAL_URL } from "../../urls";
import SingleTripProfile from "./SingleTripProfile";

const Profile = () => {
    const { user } = useContext(UserContext);
    const [tripInfo, setTripInfo] = useState({});

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch(`${MONGO_URL}/data/trips/profile`, {
            headers: {
                "X-Authorization": user.accessToken,
                "Content-type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error({ message: "Bad Request!" });
                }
                return res.json();
            })
            .then((data) => {
                setTripInfo(data);
            })
            .catch((error) => {
                setErrorMessage(error?.message || `Fetch error`);
                setOpen(true);
            });
    }, []);
    console.log(user.gender);

    return (
        <section className="profile col-md-6 text-center col-lg" id="profile-page">
            <div className="profile-container">
                {user.gender == `male` ? (
                    <>
                        <img className="profile-img" src={process.env.PUBLIC_URL + "/images/male.png"} />
                    </>
                ) : (
                    <>
                        <img className="profile-img" src={process.env.PUBLIC_URL + "/images/female.png"} />
                    </>
                )}
                <p>
                    Email: <span>{user.email}</span>
                </p>
            </div>
            <div className="profile-info">
                <p>
                    Trips History: <span>{tripInfo.length}</span> counts
                </p>
                <div className="trips-info">
                    {tripInfo.length > 0 ? (
                        tripInfo.map((trip) => <SingleTripProfile key={trip._id} trip={trip} />)
                    ) : (
                        <p>there are no offer trips yet...</p>
                    )}
                </div>
            </div>
            <AlertPopUpD open={open} closeModal={closeModal}>
                {errorMessage}
            </AlertPopUpD>
        </section>
    );
};

export default Profile;
