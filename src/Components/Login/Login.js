import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import AlertPopUpD from "../../context/AlertPopupD";

const FormGroup = ({ labelText, inputType, inputId, placeholder, inputName, value, handleOnChange, handleOnBlur, dataTestId }) => (
    <div className="form-group">
        <label htmlFor="email">{labelText}</label>
        <input
            type={inputType}
            className="form-control"
            data-testid={dataTestId}
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

const FormGroupText = React.memo(() => {
    return (
        <div className="form-group">
            <p>
                Not registered yet? <a href="/register">Register Now!</a>
            </p>
        </div>
    );
});

const SubmitButton = React.memo(() => (
    <button type="submit" data-testid="data-test-button" className="btn btn-primary">
        Submit
    </button>
));

const Login = () => {
    console.log("render main component");
    const { setUser } = useContext(UserContext);

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchLogin = (values) => {
        fetch(`https://sharedtripsbackend-production.up.railway.app/users/login`, {
            method: `POST`,
            body: JSON.stringify(values),
            headers: {
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
                if (!data.accessToken) {
                    throw Error();
                }
                setUser(data);
            })
            .catch((error) => {
                setErrorMessage(error?.message || "Fetch error!");
                setOpen(true);
            });
    };

    const createSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required!"),
        password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required!"),
    });

    const handleOnSubmit = (values) => {
        fetchLogin(values);
    };

    return (
        <section className="py-5" id="login-page">
            <div className="container login-page">
                <h1>Login</h1>
                <div className="login">
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
                                    dataTestId="data-test-email"
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
                                    dataTestId="data-test-password"
                                    placeholder="Enter password"
                                    inputName="password"
                                    value={formik.values.password}
                                    handleOnChange={formik.handleChange}
                                    handleOnBlur={formik.handleBlur}
                                />
                                <FormGroupText />
                                <SubmitButton />
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

export default Login;
