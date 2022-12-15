import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (email, password) => { }
})

export const AuthContextProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem('isLoggedIn')

    if (userInfo === '1') setIsLoggedIn(true)
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn')
  };
  return (

    <AuthContext.Provider value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
