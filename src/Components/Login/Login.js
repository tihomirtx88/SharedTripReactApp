import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
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
    <button type="submit" className="btn btn-primary">
        Submit
    </button>
));

const FormGroup = ({
    labelText,
    inputType,
    inputId,
    placeholder,
    inputName,
    value,
    handleOnChange
}) => (
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
        />
    </div>
)


// First load the Login page, open the console and look which component renders when you are typing something in the input fields. 
// You can see that Login component rerenders on every change which set the value. You can see with react.memo only Login component rerenders.
// Delete React.memo() (don't forget that it is a function, do not mess up the brackets!!!) and repeat the procedure. You have to see
// that FormGroupText component rerenders also. 
 

const FormGroupText = React.memo(() => {
    console.log("render text")
    return <div className="form-group">
        <p>
            Not registered yet? <a href="/register">Register Now!</a>
        </p>
    </div>
})

const SubmitButton = React.memo(() => (
    <button type="submit" className="btn btn-primary">
        Submit
    </button>
))

const Login = () => {
    console.log("render main component")
    const { setUser } = useContext(UserContext);


    const fetchLogin = (values) => {
        fetch(`http://localhost:3030/users/login`, {
            method: `POST`,
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.accessToken) {
                    throw Error();
                }
                setUser(data)
            })
            .catch(() => alert(`todo`));
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
                                    placeholder="Enter password"
                                    inputName="password"
                                    value={formik.values.password}
                                    handleOnChange={formik.handleChange}
                                    handleOnBlur={formik.handleBlur}
                                />
                                <FormGroupText />
                                <SubmitButton/>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default Login;
