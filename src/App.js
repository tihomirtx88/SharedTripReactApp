import { Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './Components/details/Details';
import EdiTrip from './Components/edit/EditTrip';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import LogOut from './Components/logout/LogOut';
import Register from './Components/Register/Register';
import TripCatalog from './Components/tripcatalog/TripCatalog';
import { UserProvider } from './context/UserProvider';
import CreateTrip from './createTrip/CreateTrip';


function App() {
  return (
    <UserProvider>
     <Header />
       <main>
          <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/register' element={<Register />} />
               <Route path='/login' element={<Login />} />
               <Route path='/logout' element={<LogOut />} />
               <Route path='/create' element={<CreateTrip />} />
               <Route path='/trips' element={<TripCatalog />} />
               <Route path='/details/:tripId' element={<Details />} />
               <Route path='/details/:tripId/edit' element={<EdiTrip />} />
          </Routes>
       </main>
     <Footer/>
    </UserProvider>
  );
}

export default App;
