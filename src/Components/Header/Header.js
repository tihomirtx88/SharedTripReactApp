import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

const Header = () => {

    const { user } = useContext(UserContext);


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
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/trips">
                                    Shared Trips
                                </Link>
                            </li>

                            {user.email
                                ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create">
                                            Offer Trip
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/logout">
                                            Logout as [ {user.email} ]
                                        </a>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
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

