import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Popup from "reactjs-popup";
import AlertPopUpD from "../../context/AlertPopupD";



const FormGroup = ({ labelText, inputType, inputId, placeholder, inputName, value, handleOnChange, handleOnBlur }) => (
    <div className="form-group">
        <label htmlFor="email">{labelText}</label>
        <input
            type={inputType}
            className="form-control"
            id={inputId}
            placeholder={placeholder}
            name={inputName}
            value={value || ""}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
        />
        <ErrorMessage name={inputName} />
    </div>
);

const GenderGroup = ({
    inputType,
    inputId,
    inputName,
    inputValue,
    handleOnChange,
    handleOnBlur,
    labelText,
    inputChecked,
}) => (
    <>
        <input
            type={inputType}
            id={inputId}
            name={inputName}
            value={inputValue}
            checked={inputChecked}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
        />
        <label htmlFor="female">{labelText}</label>
        <ErrorMessage name={inputName} />
    </>
);

const FormGroupText = () => {
    return (
        <div className="form-group">
            <p>
                Already have account? <a href="/login">Login Now!</a>
            </p>
        </div>
    );
};

const Submitbutton = () => {
    return (
        <button type="submit" className="btn btn-primary">
            Submit
        </button>
    );
};

const Register = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [errorMessage, setErrorMessage] = useState("")

    const fetchRegister = (values) => {
        fetch(`http://localhost:3030/users/registerr`, {
            method: `POST`,
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error({ message: "Bad Request!" })
                }
                return res.json()
            })
            .then((data) => {
                navigate(`/`);
            })
            .catch((error) => {
                setErrorMessage(error?.message || "Fetch error!")
                setOpen(true)
            });
    };

    const createSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required!"),
        password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required!"),
        rePassword: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required!"),
    });

    const handleOnSubmit = (values) => {
        if (values.password !== values.rePassword) {
            alert(`Password and repassword dont match`);
            return;
        }
        if (values.email === "" || values.password === "") {
            alert(`All fields are reqired`);
            return;
        }
        fetchRegister(values);
    };

    return (
        <section className="py-5" id="register-page">
            <div className="container register-page">
                <h1>Register</h1>
                <div className="register">
                    <Formik
                        initialValues={{}}
                        validationSchema={createSchema}
                        onSubmit={(values) => handleOnSubmit(values)}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
                                <FormGroup
                                    inputType="text"
                                    labelText="Email address"
                                    inputId="email"
                                    placeholder="Enter email"
                                    inputName="email"
                                    value={formik.values.email}
                                    handleOnChange={formik.handleChange}
                                    handleOnBlur={formik.handleBlur}
                                />

                                <FormGroup
                                    inputType="password"
                                    labelText="Password"
                                    inputId="password"
                                    placeholder="Password"
                                    inputName="password"
                                    value={formik.values.password}
                                    handleOnChange={formik.handleChange}
                                    handleOnBlur={formik.handleBlur}
                                />

                                <FormGroup
                                    inputType="password"
                                    labelText="Re-Password"
                                    inputId="rePassword"
                                    placeholder="Re-Password"
                                    inputName="rePassword"
                                    value={formik.values.rePassword}
                                    handleOnChange={formik.handleChange}
                                    handleOnBlur={formik.handleBlur}
                                />

                                <label>Gender</label>
                                <div className="gender">
                                    <GenderGroup
                                        inputType="radio"
                                        inputId="female"
                                        inputName="gender"
                                        inputValue="female"
                                        inputChecked={formik.values.gender == "female"}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                        labelText="Female"
                                    />
                                    <GenderGroup
                                        inputType="radio"
                                        inputId="male"
                                        inputName="gender"
                                        inputValue="male"
                                        inputChecked={formik.values.gender == "male"}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                        labelText="Male"
                                    />
                                </div>
                                <FormGroupText />
                                <Submitbutton />
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <AlertPopUpD
                open={open}
                closeModal={closeModal}
            >
                {errorMessage}
            </AlertPopUpD>
        </section>
    );
};

export default Register;
