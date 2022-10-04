import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../context/UserProvider";

const initialTrip = {
    start: "",
    end: "",
    date: "",
    time: "",
    carImg: "",
    carBrand: "",
    seats: "",
    price: "",
    description: "",
}

const CreateTrip = () => {

    const {setUser} = useContext(UserContext);
    const [tripInfo, setTripInfo] = useState(initialTrip);

    const changeHandler = (ev) => {
        setTripInfo({
            ...tripInfo,
            [ev.target.name]: ev.target.value
        });
        
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        const postTrip = {
            start: tripInfo.start,
            end: tripInfo.end,
            date: tripInfo.date,
            time: tripInfo.time,
            carImg: tripInfo.carImg,
            carBrand: tripInfo.carBrand,
            seats: tripInfo.seats,
            price: tripInfo.price,
            description: tripInfo.description,
        }

        fetch(`http://localhost:3030/data/trips`, {
            method: `POST`,
            body: JSON.stringify(postTrip),
            headers: {
                'X-Authorization': setUser,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.accessToken) {
                throw Error();
            }
            console.log(`lalala`)
            setUser(data);
        })
        .catch(()=> alert(`Fetch error`));
    }

    return (

        <section className="py-5" id="offer-trip-page">
            <div className="container offer-trip">
                <h1>Offer trip</h1>
                <div>
                    <form onSubmit={onSubmit} action="" method="">
                        <div className="offer-label">
                            <label htmlFor="startPoint">
                                {" "}
                                <i className="fas fa-map-marker-alt" /> Starting Point{" "}
                            </label>
                            <label htmlFor="endPoint">
                                {" "}
                                <i className="fas fa-map-marker-alt" /> End Point
                            </label>
                        </div>
                        <div className="form-group offer-input">
                            <input
                                type="text"
                                className="form-control-2"
                                id="startPoint"
                                placeholder="Studentski grad"
                                name="start"
                                value={tripInfo.start}
                                onChange={changeHandler}

                            />
                            <input
                                type="text"
                                className="form-control-2"
                                id="endPoint"
                                placeholder="Pamporovo"
                                name="end"
                                value={tripInfo.end}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="offer-label">
                            <label htmlFor="date">
                                {" "}
                                <i className="far fa-calendar-alt" /> Date
                            </label>
                            <label htmlFor="time">
                                {" "}
                                <i className="far fa-clock" /> Time
                            </label>
                        </div>
                        <div className="form-group offer-input">
                            <input
                                type="text"
                                className="form-control-2"
                                id="date"
                                placeholder="18 May 2021"
                                name="date"
                                value={tripInfo.date}
                                onChange={changeHandler}

                            />
                            <input
                                type="text"
                                className="form-control-2"
                                id="time"
                                placeholder="19:00 PM"
                                name="time"
                                value={tripInfo.time}
                                onChange={changeHandler}

                            />
                        </div>
                        <div className="offer-label">
                            <label htmlFor="carImage">Car Image</label>
                            <label htmlFor="carBrand">Car Brand</label>
                        </div>
                        <div className="form-group offer-input">
                            <input
                                type="text"
                                className="form-control-2"
                                id="carImage"
                                placeholder="https://..."
                                name="carImg"
                                value={tripInfo.carImg}
                                onChange={changeHandler}

                            />
                            <input
                                type="text"
                                className="form-control-2"
                                id="carBrand"
                                placeholder="Audi"
                                name="carBrand"
                                value={tripInfo.carBrand}
                                onChange={changeHandler}

                            />
                        </div>
                        <div className="offer-label">
                            <label htmlFor="seats">Available Seats</label>
                            <label htmlFor="price">Price</label>
                        </div>
                        <div className="form-group offer-input">
                            <input
                                type="text"
                                className="form-control-2"
                                id="seats"
                                placeholder={4}
                                name="seats"
                                value={tripInfo.seats}
                                onChange={changeHandler}

                            />
                            <input
                                type="text"
                                className="form-control-2"
                                id="price"
                                placeholder={25}
                                name="price"
                                value={tripInfo.price}
                                onChange={changeHandler}

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Information about the trip"
                                name="description"
                                value={tripInfo.description}
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


    )
}

export default CreateTrip;