import React, { useState, useEffect } from "react";
import './styles/App.css'
import { AuthContext } from "./context/index.js";
import { AppRouters } from './components/AppRouters'



function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setLoading(false)
  }, [])

  const num = 2;

  const getSecondNum = () => {
    console.log(num);
  }
  const getFirstNum = (fun) => {
    fun()
  }

  getFirstNum(getSecondNum)


  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <AppRouters />
    </AuthContext.Provider>
  )
}

export default App;