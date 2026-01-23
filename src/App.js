import './App.css';
import Header from './Header';
import Home from './Home';
import Reservation from './Reservation';
import OrderOnline from './OrderOnline';
import { useReducer } from 'react';
import {Routes, Route, useLocation} from "react-router";
import { LoginProvider } from './LoginContext';

export function updateTimes (state, action) {
let newState = state;
  switch (action.type) {
    case "selected_day_time": {
      const weekdayIndex = state.findIndex(weekday => weekday.day === action.day);
      const timeIndex = state[weekdayIndex].times.findIndex(times => times.time === action.time);

      newState[weekdayIndex].times[timeIndex].available = false;
      return newState;
    } //implement next case with login verification (with back-end)
    case "canceled_reservation": {
      return state;
    }
    default: {
      console.log("No action provided");
    }
  }
};

export const initializeTimes = () => [{
  day: "Mon., Jan. 19th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: true},
    {time: "20:00", available: false}]
},
{ day: "Tue., Jan. 20th, 2026",
  times: [{time: "16:00", available: false},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: false},
    {time: "20:00", available: true}]
},
{ day: "Wed., Jan. 21th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: true},
    {time: "20:00", available: false}]
},
{ day: "Thu., Jan. 22th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: true},
    {time: "19:00", available: false},
    {time: "20:00", available: true}]
},
{ day: "Fri., Jan. 23th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: true},
    {time: "19:00", available: true},
    {time: "20:00", available: true}]
}
];

function App() {
const [state, dispatch] = useReducer(updateTimes,initializeTimes());

  return (
    <div className={useLocation().pathname==="/" ? "container" : "reservationContainer"}>
      <LoginProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/reservation" element={<Reservation availableTimes={state} dispatch={dispatch}/>}></Route>
            <Route path="/order" element={<OrderOnline/>}></Route>
          </Routes>
        </LoginProvider>
    </div>
  );
}

export default App;
