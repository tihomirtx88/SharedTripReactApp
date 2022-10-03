import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [login, setLogin] = useState({});
    const navigate = useNavigate();

    const fetchLogin = () => {
        fetch(`http://localhost:3030/users/login`, {
            method: `POST`,
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if (!data.token) {
                throw Error();
            }
            localStorage.setItem("token", data.token);
            navigate(`/`);
        })
        .catch(() => alert(`Wrong email or password`));
    }

    const onSubmit = (ev) => {
       ev.preventDefault();
       fetchLogin();
    } WEGFWEA SRAARDSGRAESDG ERAG ERG ERAGER AERAG 

   const changeHandler = (ev) => {
       setLogin({
           ...login,
           [ev.target.name]: ev.target.value
       });
   }


    return (
        <section className="py-5" id="login-page">
            <div className="container login-page">
                <h1>Login</h1>
                <div className="login">
                    <form onSubmit={onSubmit} action="" method="">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                value={login.email || ""}
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
                                value={login.password || ""}
                                onChange={changeHandler}

                                
                            />
                        </div>
                        <div className="form-group">
                            <p>
                                Not registered yet? <a href="/register">Register Now!</a>
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

export default Login;