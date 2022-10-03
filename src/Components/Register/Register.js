const Register = () => {


    return (
        <section className="py-5" id="register-page">
            <div className="container register-page">
                <h1>Register</h1>
                <div className="register">
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
                            <label htmlFor="rePassword">Re-Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="rePassword"
                                placeholder="Re-Password"
                                name="rePassword"
                                
                            />
                        </div>
                        <label>Gender</label>
                        <div className="gender">
                            <input 
                            type="radio"
                             id="female" 
                             name="female" 
                              />
                            <label htmlFor="female">Female</label>
                            <input
                                type="radio"
                                id="male"
                                name="male"
                                defaultChecked=""
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