import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [register, setRegister] = useState({});
    const navigate = useNavigate();

    const fetchRegister = () => {
        fetch(`http://localhost:3030/users/register`, {
            method: `POST`,
            body: JSON.stringify(register),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
           console.log(data);
        })
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        fetchRegister();
     } 
 
    const changeHandler = (ev) => {
        setRegister({
            ...register,
            [ev.target.name]: ev.target.value
        });
    }



    return (
        <section className="py-5" id="register-page">
            <div className="container register-page">
                <h1>Register</h1>
                <div className="register">
                    <form onSubmit={onSubmit} action="" method="">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                value={register.email || ""}
                                onChange={changeHandler}
                                
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={register.password || ""}
                                onChange={changeHandler}
                               
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rePassword">Re-Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="rePassword"
                                placeholder="Re-Password"
                                name="rePassword"
                                value={register.rePassword || ""}
                                onChange={changeHandler}
                                
                                
                            />
                        </div>
                        <label>Gender</label>
                        <div className="gender">
                            <input 
                            type="radio"
                             id="female" 
                             name="female"
                             value={register.female || ""}
                             onChange={changeHandler}

                              />
                            <label htmlFor="female">Female</label>
                            <input
                                type="radio"
                                id="male"
                                name="male"
                                value={register.male || ""}
                                onChange={changeHandler}
                                // defaultChecked=""
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="form-group">
                            <p>
                                Already have account? <a href="/login">Login Now!</a>
                            </p>
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

export default Register;