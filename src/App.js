import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';


function App() {
  return (
    <>
     <Header />
       <main>
          <Routes>
               <Route path='/' element={<Home />} />
          </Routes>
       </main>
     <Footer/>
    </>
  );
}

export default App;
