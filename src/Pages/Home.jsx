import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Companents/Sidebar'

function Home() {
    const naviget = useNavigate()
    const Logoutbtn = () => {
        localStorage.removeItem("token")
        naviget("/")
    }
  return (
    <div className="bg-gray-100">
        <Sidebar/>
        <div className=" fixed w-full h-[80px] z-10 bg-gray-200 flex justify-end pr-5 py-5">
          <button onClick={Logoutbtn} className="py-1 px-5 cursor-pointer bg-red-500 rounded-lg text-white">Log Out</button>
        </div>
        <Outlet/>
    </div>
  )
}

export default Home
