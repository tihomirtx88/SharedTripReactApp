import { useState,useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import AlertPopUpD from "../../context/AlertPopupD";
import { UserContext } from "../../context/UserProvider";
import { MONGO_URL } from "../../urls";
import { validateTripSchema } from "../../common/validationSchemas";

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

    const fetchEdit = (values) => {
        fetch(`${MONGO_URL}/data/trips/${tripId}`, {
            method: `PUT`,
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.accessToken,
            },
        })
            .then((res) => {
                return res.json()
            })
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

    const onSubmit = (values) => {
        fetchEdit(values);
    };

    const createSchema = validateTripSchema

    return (
        <section className="py-5" id="edit-trip-page">
            <div className="container edit">
                <h1>Edit trip</h1>
                <div>
                    <Formik
                        initialValues={editInfo}
                        enableReinitialize
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
                                    value={formik.values.start || ""}
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
                                    value={formik.values.end || ""}
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
                                    value={formik.values.date || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
    
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="time"
                                    name="time"
                                    value={formik.values.time || ""}
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
                                    value={formik.values.carImg || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
    
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="carBrand"
                                    name="carBrand"
                                    value={formik.values.carBrand || ""}
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
                                    value={formik.values.seats || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur }
                                />
    
                                <input
                                    type="text"
                                    className="form-control-2"
                                    id="price"
                                    name="price"
                                    value={formik.values.price || ""}
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
                                    value={formik.values.description || ""}
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
