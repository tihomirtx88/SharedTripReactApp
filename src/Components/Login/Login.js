const Login = () => {


    return (
        <section className="py-5" id="login-page">
            <div className="container login-page">
                <h1>Login</h1>
                <div className="login">
                    <form action="" method="">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                
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