import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';

function App() {
  const gettoken = localStorage.getItem("token")
  const naviget = useNavigate()
  useEffect(()=>{
    if(!gettoken){
      naviget("/")
    }else{
      naviget("/home")
      naviget("/home/category")
      naviget("/home/discount")
      naviget("/home/sizes")
      naviget("/home/colors")
      naviget("/home/faq")
      naviget("/home/contact")
      naviget("/home/team")
      naviget("/home/news")
    }
  },[])
  return (
    <>
      <Outlet/>
      <ToastContainer />
    </>
  )
}

export default App
