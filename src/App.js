import './App.css';
import Header from './Header';
import Home from './Home';
import Reservation from './Reservation';
import OrderOnline from './OrderOnline';
import ConfirmedBooking from './ConfirmedBooking';
import { useReducer} from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router";
import { LoginProvider } from './LoginContext';
import { fetchAPI, submitAPI } from './api/bookingApi';

export const initializeTimes = () => fetchAPI(new Date());

export function updateTimes (state, action) {
  switch (action.type) {
    case "selected_day": {
      console.log("new day selected")
      return fetchAPI(action.day);
    }
    case "erased_day": {
      console.log("erased day")
      return "";
    }
    default: {
      console.log("No action provided");
    }
  }
};
function App() {
  const [state, dispatch] = useReducer(updateTimes,initializeTimes());
  let navigate = useNavigate();

  async function handleSubmit (values) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const submission = submitAPI(values);
      if (submission) {
        navigate("/confirmation");
      }
    }

  return (
    <div className={useLocation().pathname==="/" ? "container" : "reservationContainer"}>
      <LoginProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/reservation" element={<Reservation availableTimes={state} dispatch={dispatch} submitForm={handleSubmit}/>}></Route>
            <Route path="/confirmation" element={<ConfirmedBooking/>}></Route>
            <Route path="/order" element={<OrderOnline/>}></Route>
          </Routes>
        </LoginProvider>
    </div>
  );
}

export default App;
