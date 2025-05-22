import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {LayoutDashboard, Users, CirclePlus, LogOut} from 'lucide-react'
import image from '../assets/logo.png'
import {useAuth} from '../context/authContext'
import {useData} from '../context/DataContext'
import Cookies from 'js-cookie'


const Sidebar = () => {

  const {setIsAuthenticated} = useAuth()

 const { setToken } = useData()
  const navigate = useNavigate()

  const logOut = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setToken(null)
    navigate('/login')
  }

  return (
    <div className="w-64 h-screen fixed bg-[#f0f0f1]">

<div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-5">


        <div className="m-6 mb-5 w-[40px] h-[40px]">
          <img src={image} alt="Logo" />
        </div>
       
        <ul className="mx-6 flex flex-col gap-2">
          <li>
            <Link to="/" className=" hover:bg-[#312f2f] hover:text-white p-2 rounded active:duration-300 ease-in-out active:scale-[97%] flex flex-row gap-1.5"><LayoutDashboard />Dashboard</Link>
          </li>
          <li>
            <Link to="/friends" className=" hover:bg-[#312f2f] hover:text-white p-2 rounded active:duration-300 ease-in-out active:scale-[97%] flex flex-row gap-1.5"><Users/>Friends</Link>
          </li>
          <li>
            <Link to="/AddPlatform" className=" hover:bg-[#312f2f] hover:text-white p-2 rounded active:duration-300 ease-in-out active:scale-[97%] flex flex-row gap-1.5"> <CirclePlus/> Add Platform</Link>
          </li>      
        </ul>
     
      </div>
      <div className="mx-6 mb-6"> <button onClick={logOut} className=" hover:bg-red-600 hover:text-white p-2 rounded active:duration-300 ease-in-out active:scale-[97%] flex flex-row gap-1.5"> <LogOut/> Log Out</button></div>
      </div>

    </div>
  )
}

export default Sidebar


