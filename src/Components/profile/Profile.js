import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import SingleTripProfile from "./SingleTripProfile";

const Profile = () => {
    const { user } = useContext(UserContext);
    const [tripInfo, setTripInfo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3030/data/trips/profile`, {
            headers: {
                "X-Authorization": user.accessToken,
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.error) {
                    logOut();
                    return;
                }
                setTripInfo(data);
            })
            .catch(() => alert(`Wrong fetch request`));
    }, []);

    console.log(tripInfo);

    return (
        <section className="profile col-md-6 text-center col-lg" id="profile-page">
            <div className="profile-container">
                {/* Do not forget to change the path to the image */}
                {/* Gender of the user determines which picture is displayed as their avatar */}
                <img className="profile-img" src="/static/images/male.png" />
                <p>
                    Email: <span>{user.email}</span>
                </p>
            </div>
            <div className="profile-info">
                <p>
                    Trips History: <span>{tripInfo.length}</span> counts
                </p>
                <div className="trips-info">
                    {/* If there are trips created by the current logged in user display each of them */}
                    {tripInfo.length > 0 ? (
                        tripInfo.map((trip) => <SingleTripProfile key={trip._id} trip={trip} />)
                    ) : (
                        <p>there are no offer trips yet...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Profile;
