import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useState } from "react";
import AlertPopUpD from "../context/AlertPopupD";

const FormGroup = ({ inputType, inputId, placeholder, inputName, value, handleOnChange, handleOnBlur }) => (
    <>
        <input
            type={inputType}
            className="form-control-2"
            id={inputId}
            placeholder={placeholder}
            name={inputName}
            value={value || ""}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
        />
        <ErrorMessage name={inputName} />
    </>
);

const Submitbutton = () => {
    return (
        <button type="submit" className="btn btn-primary">
            Submit
        </button>
    );
};

const DescriptionGroup = ({ inputLabel, inputId, placeholder, inputName, value, handleOnChange, handleOnBlur }) => (
    <>
        <label htmlFor="description">{inputLabel}</label>
        <textarea
            className="form-control"
            id={inputId}
            placeholder={placeholder}
            name={inputName}
            value={value || ""}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
        />
        <ErrorMessage name={inputName} />
    </>
);

const CreateTrip = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [errorMessage, setErrorMessage] = useState("");

    const createSchema = Yup.object().shape({
        start: Yup.string().min(4, "Too Short!").max(10, "Too Long!").required("Required!"),
        end: Yup.string().min(4, "Too Short!").max(10, "Too Long!").required("Required!"),
        carBrand: Yup.string().min(4, "Too Short!").max(10, "Too Long!").required("Required!"),
        price: Yup.number().min(1, "Too Short!").max(51, "Too Long!").required("Required!"),
        seats: Yup.number().min(0, "Too Short!").max(5, "Too Long!").required("Required!"),
        description: Yup.string().min(6, "Too Short!").max(50, "Too Long!").required("Required!"),
    });

    const handleOnSubmit = (values) => {
        fetch(`http://localhost:3030/data/trips`, {
            method: `POST`,
            body: JSON.stringify(values),
            headers: {
                "X-Authorization": user.accessToken,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error({ message: "Bad Request!" });
                }
                return res.json();
            })
            .then((data) => {
                navigate(`/trips`);
            })
            .catch((error) => {
                setErrorMessage(error?.message || "Fetch error!");
                setOpen(true);
            });
    };

    return (
        <section className="py-5" id="offer-trip-page">
            <div className="container offer-trip">
                <h1>Offer trip</h1>
                <div>
                    <Formik
                        initialValues={{}}
                        validationSchema={createSchema}
                        onSubmit={(values) => handleOnSubmit(values)}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
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
                                    <FormGroup
                                        inputType="text"
                                        className="form-control-2"
                                        inputId="startPoint"
                                        placeholder="Studentski grad"
                                        inputName="start"
                                        value={formik.values.start}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />

                                    <FormGroup
                                        inputType="text"
                                        className="form-control-2"
                                        inputId="endPoint"
                                        placeholder="Pamporovo"
                                        inputName="end"
                                        value={formik.values.end}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
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
                                    <FormGroup
                                        inputType="text"
                                        className="form-control-2"
                                        inputId="date"
                                        placeholder="18 May 2021"
                                        inputName="date"
                                        value={formik.values.date}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />

                                    <FormGroup
                                        inputType="text"
                                        className="form-control-2"
                                        inputId="time"
                                        placeholder="19:00 PM"
                                        inputName="time"
                                        value={formik.values.time}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="offer-label">
                                    <label htmlFor="carImage">Car Image</label>
                                    <label htmlFor="carBrand">Car Brand</label>
                                </div>
                                <div className="form-group offer-input">
                                    <FormGroup
                                        inputType="text"
                                        className="form-control-2"
                                        inputId="carImage"
                                        placeholder="https://..."
                                        inputName="carImg"
                                        value={formik.values.carImg}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />

                                    <FormGroup
                                        inputType="text"
                                        className="form-control-2"
                                        inputId="carBrand"
                                        placeholder="Audi"
                                        inputName="carBrand"
                                        value={formik.values.carBrand}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="offer-label">
                                    <label htmlFor="seats">Available Seats</label>
                                    <label htmlFor="price">Price</label>
                                </div>
                                <div className="form-group offer-input">
                                    <FormGroup
                                        inputType="text"
                                        className="form-control-2"
                                        inputId="seats"
                                        placeholder={4}
                                        inputName="seats"
                                        value={formik.values.seats}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />

                                    <FormGroup
                                        inputType="text"
                                        className="form-control-2"
                                        inputId="price"
                                        placeholder={25}
                                        inputName="price"
                                        value={formik.values.price}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="form-group">
                                    <DescriptionGroup
                                        className="form-control"
                                        inputId="description"
                                        placeholder="Information about the trip"
                                        inputName="description"
                                        value={formik.values.description}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />
                                </div>
                                <Submitbutton />
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

export default CreateTrip;
