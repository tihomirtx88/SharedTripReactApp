import { useState,useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import AlertPopUpD from "../../context/AlertPopupD";
import { UserContext } from "../../context/UserProvider";
import { MONGO_URL } from "../../urls";

const EdiTrip = () => {
    const { user } = useContext(UserContext);

    const [editInfo, setEditInfo] = useState({});
    const navigate = useNavigate();
    const { tripId } = useParams();

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch(`${MONGO_URL}/data/trips/${tripId}`, {})
            .then((res) => {
                if (!res.ok) {
                    throw Error({ message: "Bad Request!" });
                }
                return res.json();
            })
            .then((data) => {
                setEditInfo(data);
            })
            .catch((error) => {
                setErrorMessage(error?.message || "Fetch error!");
                setOpen(true);
            });
    }, []);

    const fetchEdit = () => {
        fetch(`${MONGO_URL}/data/trips/${tripId}`, {
            method: `PUT`,
            body: JSON.stringify(editInfo),
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.accessToken,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    throw Error();
                }
                setEditInfo(data);
                navigate(`/details/${tripId}`);
            })
            .catch(() => alert(`Cannot fetch`));
    };

    const changeHandler = (ev) => {
        setEditInfo({
            ...editInfo,
            [ev.target.name]: ev.target.value,
        });
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        fetchEdit();
    };

    const createSchema = Yup.object().shape({
        start: Yup.string().required('This field is required').min(4, 'Start point must be at least 4 characters long'),
            end: Yup.string().required('This field is required').min(4, 'End point must be at least 4 characters long'),
            date: Yup.string().required('This field is required'),
            time: Yup.string().required('This field is required'),
            carImg: Yup.string().required('This field is required').max(100, 'Image url must be less of 100 characters long'),
            carBrand: Yup.string().required('This field is required').min(4, 'Car brand must be at least 4 characters long'),
            seats: Yup.string().required('This field is required').min(0, 'Seats must be at least 1').max(4, 'Seats must be less of 5'),
            price: Yup.string().required('This field is required').min(1, 'Price must be at least 1').max(50, 'Price must be less of 50'),
            description: Yup.string().required('This field is required').min(10, 'Description must be at least 10 characters long')
    });

   
    return (
        <section className="py-5" id="edit-trip-page">
            <div className="container edit">
                <h1>Edit trip</h1>
                <div>
                    <Formik
                    initialValues={{}}
                    validationSchema={createSchema}
                    onChange={(values) => changeHandler(values)}
                    onSubmit={(values) => onSubmit(values)}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
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
                            <div className="form-group edit-input" >
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="startPoint"
                                    name="start"
                                    // value={editInfo.end || ""}
                                    value={formik.values.start}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.start && formik.touched.start 
                                    ?  <span style={{color:'red'}}>{formik.errors.start}</span>
                                    : null}

                                
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="endPoint"
                                    name="end"
                                    // value={editInfo.end || ""}
                                    // onChange={changeHandler}
                                    value={formik.values.end}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
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
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="date"
                                    name="date"
                                    // value={editInfo.date || ""}
                                    // onChange={changeHandler}
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
    
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="time"
                                    name="time"
                                    // value={editInfo.time || ""}
                                    // onChange={changeHandler}
                                    value={formik.values.time}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="edit-label">
                                <label htmlFor="carImage">Car Image</label>
                                <label htmlFor="carBrand">Car Brand</label>
                            </div>
                            <div className="form-group edit-input">
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="carImage"
                                    name="carImg"
                                    // value={editInfo.carImg || ""}
                                    // onChange={changeHandler}
                                    value={formik.values.carImg}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
    
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="carBrand"
                                    name="carBrand"
                                    // value={editInfo.carBrand || ""}
                                    // onChange={changeHandler}
                                    value={formik.values.carBrand}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="edit-label">
                                <label htmlFor="seats">Available Seats</label>
                                <label htmlFor="price">Price</label>
                            </div>
                            <div className="form-group edit-input">
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="seats"
                                    name="seats"
                                    // value={editInfo.seats || ""}
                                    // onChange={changeHandler}
                                    value={formik.values.seats}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
    
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="price"
                                    name="price"
                                    // value={editInfo.price || ""}
                                    // onChange={changeHandler}
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    // value={editInfo.description || ""}
                                    // onChange={changeHandler}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                        )}                
                    </Formik>
                </div>
            </div>
            <AlertPopUpD open={open} closeModal={closeModal}>
                {errorMessage}
            </AlertPopUpD>
        </section>
    );
};

export default EdiTrip;
