import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { UserProvider } from './context/UserProvider';


function App() {
  return (
    <UserProvider>
     <Header />
       <main>
          <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/register' element={<Register />} />
               <Route path='/login' element={<Login />} />
          </Routes>
       </main>
     <Footer/>
    </UserProvider>
  );
}

export default App;
