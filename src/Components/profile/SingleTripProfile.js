const SingleTripProfile = ({ trip }) => {
    return (
        <>
            <p>
                from <span>{trip.start}</span> to <span>{trip.end}</span> on <span>{trip.date}</span> at <span>{trip.time}</span>
            </p>
        </>
    );
};

export default SingleTripProfile;
