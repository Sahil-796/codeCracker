import React, {useState, useEffect} from 'react'
import {useData} from '../context/DataContext'
import {Navigate, Link} from 'react-router-dom'
import {PulseLoader} from 'react-spinners'
import axios from 'axios'

const AddPlatform = () => {

  const { isAuthenticated, loading, platforms, token } = useData()
  const [isDelay, setisDelay] = useState(false)
  const [username, setUsername] = useState("")
  const [platformToAdd, setplatformToAdd] = useState("")
  const [msg, setmsg] = useState("")
  
    useEffect(()=>{
      let timer

      if(loading){
        timer = setTimeout(()=>{
          setisDelay(true)
        }, 10000)
      } else {
        setisDelay(false)
        clearTimeout(timer)
      }
      return () => clearTimeout(timer)
    }, [loading])
  

      if (loading){
      return (

        <div className='flex flex-col gap-5 justify-center items-center h-screen bg-[#f0f0f1]'>
      <PulseLoader/>
        {isDelay && (<p className='text-md font-semibold text-black'>Server timeout due to inactivity. Please wait a while. About 50s.</p>)}
    </div>
    
    
    )
    }
  

  if (!isAuthenticated) {
      return <Navigate to='/login' replace/>
    }

    // list of added plats
    // to add section
    // message on success/failure
    
    // Remove platforms already added by the user from availablePlats
    const allPlats = ['codeforces', 'leetcode'];
    const addedPlats = Array.isArray(platforms) ? platforms.map(pf => pf.platform) : [];
    const availablePlats = allPlats.filter(p => !addedPlats.includes(p));


    const handlesubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post('http://localhost:5000/api/addPlatform',{
            platform:platformToAdd,
            handle:username
          },{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setmsg(res.data.message)

        
          
      }catch(err){
          if(err.response && err.response.status===400){
            setmsg("Platform already added")
            
          }
          else {
            setmsg("Something went wrong")
          }
      }

    }
    

  return (
    <div className='flex flex-col items-center justify-center bg-[#f0f0f1] h-full'>
      <div className='text-center flex flex-col rounded-lg gap-2'>
        <h1 className='font-bold text-2xl text-blue-700'>Existing platform ids</h1>
        <Table platforms={platforms}/>
      </div>

      <div className=" text-center mt-8 w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-4 text-blue-700">Add a platform</h2>


 {availablePlats.length !== 0 ? <form 
        onSubmit={handlesubmit}
        className="flex flex-col gap-4">
          <label className="flex flex-col text-left">
            <span className="mb-1 font-medium text-gray-700">Platform</span>
            <select
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="platform"
              onChange={(e)=>setplatformToAdd(e.target.value)}
              required
            >
              <option value="">Select a platform</option>
              {availablePlats.map((pf, idx) => (
                <option key={idx} value={pf}>
                  {pf}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-left">
            <span className="mb-1 font-medium text-gray-700">Username</span>
            <input
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
              type="text"
              name="username"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
              required
            />
          </label>
          <button
          
            type="submit"
            className="bg-blue-600 text-white rounded-lg shadow-lg px-4 py-2 font-semibold hover:bg-blue-700 transition "
          >
            Add
          </button>
        </form> : 
        <h2>All supported platforms added ! Get a life bro.</h2>}       
 
 
      </div>
    </div>
  )
}



const Table = ({platforms}) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <table className="min-w-[350px] bg-white rounded-xl shadow-lg text-left border border-gray-200">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-3 font-semibold text-blue-800 border-b border-gray-200">Username</th>
            <th className="px-6 py-3 font-semibold text-blue-800 border-b border-gray-200">Platform</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(platforms) && platforms.length > 0 ? (
            platforms.map((pf, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-3 border-b font-medium border-gray-300">{pf.username}</td>
                <td className="px-6 py-3 border-b font-medium border-gray-300">{pf.platform}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-gray-500 text-center" colSpan={2}>
                No platforms found. Try adding some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}



export default AddPlatform