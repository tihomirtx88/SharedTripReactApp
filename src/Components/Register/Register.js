import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormGroup = ({ labelText, inputType, inputId, placeholder, inputName, value, handleOnChange }) => (
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
    const [register, setRegister] = useState({});
    const navigate = useNavigate();

    const fetchRegister = () => {
        fetch(`http://localhost:3030/users/register`, {
            method: `POST`,
            body: JSON.stringify(register),
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

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (register.password !== register.rePassword) {
            alert(`Password and repassword dont match`);
            return;
        }
        if (register.email === "" || register.password === "") {
            alert(`All fields are reqired`);
            return;
        }
        fetchRegister();
    };

    const changeHandler = (ev) => {
        setRegister({
            ...register,
            [ev.target.name]: ev.target.value,
        });
    };

    return (
        <section className="py-5" id="register-page">
            <div className="container register-page">
                <h1>Register</h1>
                <div className="register">
                    <form onSubmit={onSubmit} action="" method="">
                        <FormGroup
                            inputType="text"
                            labelText="Email address"
                            inputId="email"
                            placeholder="Enter email"
                            inputName="email"
                            value={register.email}
                            handleOnChange={changeHandler}
                        />

                        <FormGroup
                            inputType="text"
                            labelText="Password"
                            inputId="password"
                            placeholder="Password"
                            inputName="password"
                            value={register.password}
                            handleOnChange={changeHandler}
                        />

                        <FormGroup
                            inputType="password"
                            labelText="Re-Password"
                            inputId="rePassword"
                            placeholder="Re-Password"
                            inputName="rePassword"
                            value={register.rePassword}
                            handleOnChange={changeHandler}
                        />

                        <label>Gender</label>
                        <div className="gender">
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={register.gender == "female"}
                                onChange={changeHandler}
                            />
                            <label htmlFor="female">Female</label>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={register.gender == "male"}
                                onChange={changeHandler}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <FormGroupText />
                        <Submitbutton />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
