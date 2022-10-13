import { Link } from "react-router-dom";

const SingleTrip = ({ trip }) => {
    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <img className="card-img-top" src={trip.carImg} alt="" />
                <div className="card-body">
                    <h5>
                        <i className="fas fa-route" /> <span>{trip.start}</span> - <span>{trip.end}</span>
                    </h5>
                    <h5 className="mt-4 card-info">
                        <i className="far fa-calendar-alt" /> Date: <span>{trip.date}</span>
                    </h5>
                    <h5 className="mt-4 card-info">
                        <i className="far fa-clock" /> Time: <span>{trip.time}</span>
                    </h5>
                    <h5 className="mt-4">
                        <i className="fas fa-hand-holding-usd" /> Price: <span>{trip.price}</span> BGN
                    </h5>
                </div>
                <div className="card-footer">
                    <Link to={`/details/${trip._id}`} className="btn btn-primary">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleTrip;
