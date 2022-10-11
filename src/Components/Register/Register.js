import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const FormGroupText = React.memo(() => {
    return (
        <div className="form-group">
            <p>
                Already have account? <a href="/login">Login Now!</a>
            </p>
        </div>
    );
});

const Submitbutton = React.memo(() => {
    return (
        <button type="submit" className="btn btn-primary">
            Submit
        </button>
    );
});

const Register = () => {
    const navigate = useNavigate();

    const fetchRegister = (values) => {
        fetch(`http://localhost:3030/users/register`, {
            method: `POST`,
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                navigate(`/`);
                console.log(data);
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
                                    {/* <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={formik.values.gender == "female"}
                                        handleOnBlur={formik.handleBlur}
                                    />
                                    <label htmlFor="female">Female</label> */}
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
                                    {/* <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={formik.values.gender == "male"}
                                        handleOnChange={formik.handleChange}
                                        handleOnBlur={formik.handleBlur}
                                    />
                                    <label htmlFor="male">Male</label> */}
                                </div>
                                <FormGroupText />
                                <Submitbutton />
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default Register;
