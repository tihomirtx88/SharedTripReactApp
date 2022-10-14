import { Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./Components/details/Details";
import EdiTrip from "./Components/edit/EditTrip";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import Home from "./Components/home/Home";
import Login from "./Components/login/Login";
import LogOut from "./Components/logout/LogOut";
import AlertPopUp from "./Components/popupalert/AlertPopUp";
import Profile from "./Components/profile/Profile";
import Register from "./Components/register/Register";
import TripCatalog from "./Components/tripcatalog/TripCatalog";
import { AlertProvider } from "./context/AlertContext";
import { UserProvider } from "./context/UserProvider";
import CreateTrip from "./createTrip/CreateTrip";

function App() {
    return (
        <UserProvider>
            <Header />
                <AlertProvider>
                    <main>
                        <Routes>
                            {/* <Route path="/" element={<AlertPopUp />} /> */}
                            <Route path="/" element={
                                <>
                                    <Home />
                                    <AlertPopUp />
                                </>
                            } />
                            <Route path="/register" element={
                                <>
                                    
                                    <Register />
                                </>
                            } />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<LogOut />} />
                            <Route path="/create" element={<CreateTrip />} />
                            <Route path="/trips" element={<TripCatalog />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/details/:tripId" element={<Details />} />
                            <Route path="/details/:tripId/edit" element={<EdiTrip />} />
                        </Routes>
                    </main>
                </AlertProvider>
            <Footer />
        </UserProvider>
    );
}

export default App;
