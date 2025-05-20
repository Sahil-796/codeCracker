import React , {useState} from 'react'
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';


const Layout = () => {

    

  return (
    <div className='text-black flex h-screen'>
     

        
        <Sidebar/>
     
    
    <main className="flex-1 transition-all duration-300"><Outlet /></main>
    </div>
  )
}

export default Layout