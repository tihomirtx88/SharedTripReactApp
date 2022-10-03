const Header = () => {
   
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <img
                        className="logo"
                        src={process.env.PUBLIC_URL + '/images/before.png'}
                        alt="before-logo"
                    />
                    <img
                        className="car logo"
                        src={process.env.PUBLIC_URL + '/images/trip-logo.png'}
                        alt="trip-logo"
                    />
                    <img className="logo" src={process.env.PUBLIC_URL + '/images/after.png'} alt="after-logo" />
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/trips">
                                    Shared Trips
                                </a>
                            </li>
    
                            {/* {user.email
                            //TODO user authentication
                                ? */}
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/create">
                                            Offer Trip
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/profile">
                                            Profile
                                        </a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className="nav-link" href="logout">
                                            Logout as [ {user.email} ]
                                        </a>
                                    </li> */}
                                </>
                                {/* : */}
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">
                                            Login
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">
                                            Register
                                        </a>
                                    </li>
                                </>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Header;