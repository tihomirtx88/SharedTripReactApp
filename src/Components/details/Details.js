import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import { Link } from "react-router-dom";

const Details = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();
    const { user, logOut } = useContext(UserContext);
    const { tripId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3030/data/trips`, {})
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.error) {
                    logOut();
                    navigate("/login");
                    return;
                }
                setTrips(data);
            });
    }, []);

    const selectTrip = (tripId) => {
        return trips.find((trip) => trip._id == tripId) || {};
    };

    const currentTrip = selectTrip(tripId);

    console.log(currentTrip.buddies, `buddies array`);

    const isOwner = currentTrip.owner == user._id;
    const isEmpty = currentTrip.seats <= 0;
    const seatLeft = currentTrip.seats;
    const isAlreadyJoin = currentTrip.buddies.includes(user._id);

    const tripDeleteHandler = () => {
        const confirmation = window.confirm("Are you sure you want to delete this trip?");

        if (confirmation) {
            fetch(`http://localhost:3030/data/trips/${tripId}`, {
                method: `DELETE`,
                headers: {
                    "X-Authorization": user.accessToken,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status !== 204) {
                        throw Error();
                    }
                    navigate(`/`);
                })
                .catch(() => alert(`TODO`));
        }
    };

    const onJoinEvent = () => {
        fetch(`http://localhost:3030/data/join/${tripId}`, {
            method: `POST`,
            body: JSON.stringify(trips),
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.accessToken,
            },
        })
            .then((res) => {
                console.log(res);
            })
            // .then((data) => {

            //     setTrips(data);
            // })
            .catch(() => alert(`TODO from join`));
        // console.log(trips, `ot trips`);
    };

    return (
        <section className="py-5 details" id="trip-details-page">
            <div className="container">
                <div className="destination">
                    <div>
                        <span className="icon">
                            <i className="fas fa-map-marked-alt" />
                        </span>
                        <h5>
                            {" "}
                            from <span>{currentTrip.start}</span> to <span>{currentTrip.end}</span>{" "}
                        </h5>
                    </div>
                    <div>
                        <span className="icon">
                            <i className="fas fa-calendar-alt" />
                        </span>
                        <h5>
                            {" "}
                            <span>2021-07-07</span> at <span>{currentTrip.time}</span>{" "}
                        </h5>
                    </div>
                </div>
                <p className="line" />
                {/* <div className="buddies-info">
                    <i className="fas fa-users buddies" />
                    <h5>Shared trip Buddies</h5>
                     <div>
                         if there are joined buddies for the current trip separate them with comma and space", " 
                        <p>peter@abv.bg, marry@abv.bg</p>
                         If not display: 
                        <p>there are no buddies yet...</p>
                    </div> 
                    
                    <h5>
                        Driver: <span>{user.email}</span>{" "}
                    </h5>
                </div> */}
                <p className="line" />
                <h5 className="brand">
                    Car Brand: <span className="lead">{currentTrip.carBrand}</span>
                </h5>
                <div className="trip-info">
                    <div>
                        <img className="img-fluid rounded" src={currentTrip.carImg} alt="car-image" />
                    </div>
                    <div className="trip-desc">
                        <h5>Information about the trip</h5>
                        <textarea className="lead" disabled={true} value={currentTrip.description} />

                        <h5>
                            Price: <span className="lead">{currentTrip.price}</span> BGN
                        </h5>
                        {user && (
                            <div className="actions">
                                {isOwner ? (
                                    <>
                                        <button onClick={tripDeleteHandler} className="btn btn-danger">
                                            Delete this trip
                                        </button>
                                        <Link to={`/details/${currentTrip._id}/edit`} className="btn btn-warning">
                                            Edit this trip
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {isEmpty ? (
                                            <>
                                                <span className="btn btn-secondary">
                                                    No seats available! [ {seatLeft} ]
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={onJoinEvent} className="btn btn-join">
                                                    Join now, [ {seatLeft} ] seats left!
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}

                                
                                {/* <span className="btn btn-info">Already joined. Don't be late!</span> */}
                                {/* logged in user and has already joined the trip  */}
                                {/* logged in user with no available seats  */}
                                {/* logged in user with available seats  */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;
