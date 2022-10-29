import { Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./Components/details/Details";
import EdiTrip from "./Components/edit/EditTrip";
import Footer from "./Components/footer/Footer";
import GoogleMap from "./Components/googlemap/GoogleMap";
import Header from "./Components/header/Header";
import Home from "./Components/home/Home";
import Login from "./Components/login/Login";
import LogOut from "./Components/logout/LogOut";
import Profile from "./Components/profile/Profile";
import Register from "./Components/register/Register";
import Search from "./Components/search/Search";
import TripCatalog from "./Components/tripcatalog/TripCatalog";
import { UserProvider } from "./context/UserProvider";
import CreateTrip from "./createTrip/CreateTrip";

function App() {
    return (
        <UserProvider>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/google" element={<GoogleMap />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/create" element={<CreateTrip />} />
                    <Route path="/trips" element={<TripCatalog />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/details/:tripId" element={<Details />} />
                    <Route path="/details/:tripId/edit" element={<EdiTrip />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </main>
            <Footer />
        </UserProvider>
    );
}

export default App;
