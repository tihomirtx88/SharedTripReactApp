import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

const EdiTrip = () => {
    const {user } = useContext(UserContext);

    const [editInfo, setEditInfo] = useState({
        start: "",
        end: "",
        date: "",
        time: "",
        carImg: "",
        carBrand: "",
        seats: "",
        price: "",
        description: ""
    });
    const navigate = useNavigate();
    const {tripId} = useParams();

    const fetchEdit = () => {
        fetch(`http://localhost:3030/data/trips/${tripId}`, {
            method: `PUT`,
            body: JSON.stringify(editInfo),
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.accessToken
            }
        })
        .then((res) => res.json())
            .then((data) => {        
                if (data.error) {
                    throw Error();
                }
                navigate(`/details/${tripId}`);
                console.log(data);
            })
            .catch(
               () => alert(`Cannot fetch`)
            );
    }

    const changeHandler = (ev) => {
        setEditInfo({
            ...editInfo,
            [ev.target.name]: ev.target.value,
        });
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (editInfo.start === "" || editInfo.end === "" || editInfo.date === "" 
        || editInfo.time === "" || editInfo.carImg === "" || editInfo.carBrand === ""
        || editInfo.seats === "" || editInfo.price === "" || editInfo.description === "") {
            alert(`All fields are reqired`);
            return
        }

        fetchEdit();
    }

    return (
        <section className="py-5" id="edit-trip-page">
            <div className="container edit">
                <h1>Edit trip</h1>
                <div>
                    <form onSubmit={onSubmit} action="" method="">
                        <div className="edit-label">
                            <label htmlFor="startPoint">
                                {" "}
                                <i className="fas fa-map-marker-alt" /> Starting Point
                            </label>
                            <label htmlFor="endPoint">
                                {" "}
                                <i className="fas fa-map-marker-alt" /> End Point
                            </label>
                        </div>
                        <div className="form-group edit-input">
                            <input type="text" 
                            className="form-control-2" 
                            id="startPoint" 
                            name="start" 
                            value={editInfo.start || ""}
                            onChange={changeHandler}
                            />

                            <input type="text" 
                            className="form-control-2" 
                            id="endPoint" 
                            name="end" 
                            value={editInfo.end || ""}
                            onChange={changeHandler}
                            />

                        </div>
                        <div className="edit-label">
                            <label htmlFor="date">
                                {" "}
                                <i className="far fa-calendar-alt" /> Date
                            </label>
                            <label htmlFor="time">
                                {" "}
                                <i className="far fa-clock" /> Time
                            </label>
                        </div>
                        <div className="form-group edit-input">
                            <input type="text" 
                            className="form-control-2" 
                            id="date" 
                            name="date" 
                            value={editInfo.date || ""}
                            onChange={changeHandler}/>

                            <input type="text" 
                            className="form-control-2" 
                            id="time" 
                            name="time" 
                            value={editInfo.time || ""}
                            onChange={changeHandler} />

                        </div>
                        <div className="edit-label">
                            <label htmlFor="carImage">Car Image</label>
                            <label htmlFor="carBrand">Car Brand</label>
                        </div>
                        <div className="form-group edit-input">
                            <input type="text" 
                            className="form-control-2" 
                            id="carImage" 
                            name="carImg" 
                            value={editInfo.carImg || ""}
                            onChange={changeHandler}
                            />

                            <input type="text" 
                            className="form-control-2" 
                            id="carBrand" 
                            name="carBrand" 
                            value={editInfo.carBrand || ""}
                            onChange={changeHandler}
                            />
                        </div>
                        <div className="edit-label">
                            <label htmlFor="seats">Available Seats</label>
                            <label htmlFor="price">Price</label>
                        </div>
                        <div className="form-group edit-input">
                            <input type="text" 
                            className="form-control-2" 
                            id="seats"
                            name="seats" 
                            value={editInfo.seats || ""}
                            onChange={changeHandler} />

                            <input type="text" 
                            className="form-control-2" 
                            id="price" 
                            name="price" 
                            value={editInfo.price || ""}
                            onChange={changeHandler} />

                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" 
                            id="description" 
                            name="description" 
                            value={editInfo.description || ""}
                            onChange={changeHandler} 

                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EdiTrip;