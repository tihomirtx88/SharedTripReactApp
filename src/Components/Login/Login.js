import { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [login, setLogin] = useState({});

    const fetchLogin = () => {
        fetch(`http://localhost:3030/users/login`, {
            method: `POST`,
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.accessToken) {
                    throw Error();
                }
                setUser(data);
            })
            .catch(() => alert(`Wrong email or password`));
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        fetchLogin();
    };

    const changeHandler = (ev) => {
        setLogin({
            ...login,
            [ev.target.name]: ev.target.value,
        });
    };

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
    );
};

export default Login;
