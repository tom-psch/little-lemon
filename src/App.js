import './App.css';
import Header from './Header';
import Home from './Home';
import Reservation from './Reservation';

import {Routes, Route, useLocation} from "react-router";
import { LoginProvider } from './LoginContext';


function App() {
  return (
    <div className={useLocation().pathname=="/" ? "container" : "reservationContainer"}>
      <LoginProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/reservation" element={<Reservation/>}></Route>
          </Routes>
        </LoginProvider>
    </div>
  );
}

export default App;
