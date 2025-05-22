import React, {useState, useEffect} from 'react'
import {Navigate, Link} from 'react-router-dom'

import TotalSolved from '../components/TotalSolved'
import {CirclePlus} from 'lucide-react'
import sloth from '../assets/sloth.png'
import Leetcode from '../components/Leetcode'
import Codeforces from '../components/Codeforces'
import {PulseLoader} from 'react-spinners'
import { useAuth } from '../context/authContext'
import {useData} from '../context/DataContext'

const Dashboard = () => {
  
  
  
  
  const { isAuthenticated, setIsAuthenticated } = useAuth()
    if (!isAuthenticated) {
      return <Navigate to='/login' replace/>
    }
    
    const {username, email, platforms, platformStats, loading, token} = useData()
    if (loading){
      return (
      

        <div className='flex justify-center items-center h-screen bg-[#f0f0f1]'>
      <PulseLoader/>
    </div>
    
    
    )
    }

  return (
    <div className='min-h-screen bg-[#f0f0f1] p-6'>
    
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 tracking-tight">
      Hi <span className="text-indigo-600">{username} 👋 </span>
    </h1>
    
    {platforms !== null && platforms.length === 0 && 
    <div className='bg-[#f0f0f1] h-full flex items-center'>      
       <NoPlatformFound/> </div>}

{/* Platform dashboard body */}
<div className='flex flex-col gap-10'> 

        
        {platforms && platforms.length > 0 && <Main platformStats={platformStats}/>
        }
</div>            
      

    </div>
  )
}


function NoPlatformFound() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xl mx-auto text-center flex flex-col items-center">
      
      <img
        src={sloth}
        alt="No Platform Found"
        className="w-40 h-40 mb-4"
      />

      <h2 className="text-xl font-semibold text-gray-700 mb-2">Oops! No Platform Found</h2>
      <p className="text-gray-500 mb-4">
        Try adding a platform from <span className="font-medium text-indigo-600">Add Platform</span>.
      </p>

  
      <button className="bg-indigo-600 rounded-4xl">
        <Link to="/AddPlatform" className=" hover:bg-indigo-800 text-white p-2 rounded-4xl active:duration-300 ease-in-out active:scale-[97%] flex flex-row gap-1.5"> <CirclePlus/> Add Platform</Link>
      </button>
    </div>
  );
}

function Main({platformStats}){
 
   return <>  
       { platformStats.map((pf, idx) => {
          
        switch (pf.platform) {
          case "leetcode":
             return <Leetcode data={pf} key={idx}/>
          case "codeforces":
             return <Codeforces data={pf} key={idx}/>
          
        }
        })
      }
        </>   
}


export default Dashboard