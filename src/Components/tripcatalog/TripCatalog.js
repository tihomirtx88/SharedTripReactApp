import { useState } from "react";
import { useEffect } from "react";
import AlertPopUpD from "../../context/AlertPopupD";
import SingleTrip from "./singletrip/SingleTrip";

const TripCatalog = () => {
    const [trips, setTrips] = useState([]);

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3030/data/trips`, {})
            .then((res) => {
                if (!res.ok) {
                    throw Error({ message: "Bad Request!" });
                }
                return res.json();
            })
            .then((data) => {
                setTrips(data);
            })
            .catch((error) => {
                setErrorMessage(error?.message || `Fetch error`)
                setOpen(true);
            });
    }, []);

    return (
        <section className="container" id="shared-trips-page">
            <header className="trip">
                <h1>Welcome Sharetripers!</h1>
                <p className="lead">Sharedtrip is the best way to road across the country.</p>
                <p className="lead">
                    Find yours Sharedtrip's buddies, when you share with us yours trip plans and let the exploration
                    begin!
                </p>
            </header>
            <div className="row text-center">
                {trips.length > 0 ? (
                    trips.map((trip) => <SingleTrip key={trip._id} trip={trip} />)
                ) : (
                    <div className="no-trips">
                        <img src="https://www.stagweb.co.uk/img/activities/big/sexyhitchhiker1.jpg" />
                        <p className="lead">Hitchhiker time...</p>
                    </div>
                )}
            </div>
            <AlertPopUpD open={open} closeModal={closeModal}>
                {errorMessage}
            </AlertPopUpD>
        </section>
    );
};

export default TripCatalog;
