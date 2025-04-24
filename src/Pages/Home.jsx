import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Companents/Sidebar'

function Home() {
    const naviget = useNavigate()
    const Logoutbtn = () => {
        localStorage.removeItem("token")
        naviget("/")
    }
  return (
    <>
        <Sidebar/>
        <div className="w-full flex justify-end pr-5 py-5">
          <button onClick={Logoutbtn} className="py-1 px-5 cursor-pointer bg-red-500 rounded-lg text-white">Log Out</button>
        </div>
        <Outlet/>
    </>
  )
}

export default Home
