import React , {useState} from 'react'
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';


const Layout = () => {

    

  return (
    <div className='text-black flex '>
     

        
        <Sidebar/>
     
    
    <main className="ml-64 min-h-screen w-full overflow-x-auto transition-all duration-300"><Outlet /></main>
    </div>
  )
}

export default Layout