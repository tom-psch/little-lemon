import './App.css';
import Header from './Header';
import Main from './Main';
import Aside from './Aside';
import Footer from './Footer';
// import {Router, ReactRouter} from "react";
import { LoginProvider } from './LoginContext';

function App() {
  return (
    <>
    <LoginProvider>
        <Header/>
        <Main/>
        <Aside/>
        <Footer/>
      </LoginProvider>
    </>
  );
}

export default App;
