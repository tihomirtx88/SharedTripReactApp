import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import { Link } from "react-router-dom";

const Details = () => {
    const [trip, setTrip] = useState({});
    const navigate = useNavigate();
    const { user, logOut } = useContext(UserContext);
    const { tripId } = useParams();
    const [isOwner, setIsOwner] = useState(false);
    const [isEmpty, setIsEmpty] = useState();
    const [availableSeats, setAvailableSeats] = useState(0);
    const [isJoined, setIsJoined] = useState(false);
    const [emailsInfo, setEmailsInfo] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchTrip = () => {
        fetch(`http://localhost:3030/data/trips/${tripId}`, {})
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    logOut();
                    return;
                }
                setTrip(data);
            })
            .finally(() => setIsLoading(false));
    };

    const fetchBuddies = () => {
        fetch(`http://localhost:3030/data/trips/buddies/${tripId}`, {})
            .then((res) => res.json())
            .then((data) => {
                setEmailsInfo(data);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            fetchTrip();
            fetchBuddies();
        }, 5000);
    }, []);

    useEffect(() => {
        if (!trip.owner) {
            return;
        }
        setIsOwner(trip.owner == user._id);
        setIsEmpty(trip.seats > 0);
        setAvailableSeats(trip.seats);
        setIsJoined(trip.buddies.includes(user._id));
    }, [trip]);

    const tripDeleteHandler = (ev) => {
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

    const onJoinEvent = (ev) => {
        ev.preventDefault();
        fetch(`http://localhost:3030/data/join/${tripId}`, {
            method: `POST`,
            body: JSON.stringify(trip),
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.accessToken,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTrip(data);
            })
            .catch(() => alert(`TODO from join`));
    };

    return (
        <section className="py-5 details" id="trip-details-page">
            <div className="container">
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                    <>
                        <div className="destination">
                            <div>
                                <span className="icon">
                                    <i className="fas fa-map-marked-alt" />
                                </span>
                                <h5>
                                    {" "}
                                    from <span>{trip.start}</span> to <span>{trip.end}</span>{" "}
                                </h5>
                            </div>
                            <div>
                                <span className="icon">
                                    <i className="fas fa-calendar-alt" />
                                </span>
                                <h5>
                                    {" "}
                                    <span>2021-07-07</span> at <span>{}</span>{" "}
                                </h5>
                            </div>
                        </div>
                        <p className="line" />
                        <div className="buddies-info">
                            <i className="fas fa-users buddies" />
                            <h5>Shared trip Buddies</h5>
                            <div>
                                {trip.buddies?.length > 0 ? (
                                    <>
                                        {emailsInfo.map((email) => (
                                            <div>{email} </div>
                                        ))}
                                    </>
                                ) : (
                                    <p>there are no buddies yet...</p>
                                )}
                            </div>
                        </div>
                        <p className="line" />
                        <h5 className="brand">
                            Car Brand: <span className="lead">{trip.carBrand}</span>
                        </h5>
                        <div className="trip-info">
                            <div>
                                <img className="img-fluid rounded" src={trip.carImg} alt="car-image" />
                            </div>
                            <div className="trip-desc">
                                <h5>Information about the trip</h5>
                                <textarea className="lead" disabled={true} value={trip.description} />

                                <h5>
                                    Price: <span className="lead">{trip.price}</span> BGN
                                </h5>
                                {user.email && (
                                    <div className="actions">
                                        {isOwner ? (
                                            <>
                                                <button onClick={tripDeleteHandler} className="btn btn-danger">
                                                    Delete this trip
                                                </button>
                                                <Link to={`/details/${trip._id}/edit`} className="btn btn-warning">
                                                    Edit this trip
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                {isJoined ? (
                                                    <>
                                                        <span className="btn btn-info">
                                                            Already joined. Don't be late!
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        {isEmpty ? (
                                                            <>
                                                                <button onClick={onJoinEvent} className="btn btn-join">
                                                                    Join now, [ {availableSeats} ] seats left!
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="btn btn-secondary">
                                                                    No seats available! [ {availableSeats} ]
                                                                </span>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Details;
