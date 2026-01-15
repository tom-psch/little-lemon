import { useContext, createContext, useState } from "react";

const LoginContext = createContext(undefined);

export const LoginProvider = ({ children }) => {
 const [popup, setPopup] = useState(false);

// console.log(popup);
 return (
   <LoginContext.Provider
     value={{
       popup,
       setPopup: () => setPopup(!popup),
     }}
   >
     {children}
   </LoginContext.Provider>
 );
};


export const useLogin = () => useContext(LoginContext);
