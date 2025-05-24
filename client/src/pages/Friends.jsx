import React, {useState, useEffect} from 'react'
import {useData} from '../context/DataContext'
import {Navigate, Link} from 'react-router-dom'
import {PulseLoader} from 'react-spinners'
import axios from 'axios'

const Friends = () => {

  const { isAuthenticated, friends, loading, username, totalSolved, token } = useData()
  const [isDelay, setisDelay] = useState(false)
  const [friendName, setFriendName] = useState("")
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


    const handlesubmit = async (e) =>{
        e.preventDefault();

         try {
                  const res = await axios.post('http://localhost:5000/api/addFriend',{
                    friend:friendName
                  },{
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
        
                setmsg(res.data.message)
                setFriendName("")
              } catch (err){
                setmsg(err.response.data.message)
                setFriendName("")
              }

    }

  return (
    <div className='flex flex-col gap-5 items-center justify-center bg-[#f0f0f1] h-full'>
      
<div className='text-center flex flex-col rounded-lg gap-2 bg-white p-5 shadow-md '>
        <h1 className='font-bold text-2xl text-blue-700'>Leaderboard</h1>
        <Leaderboard friends={friends} uname={username} total ={totalSolved}/>
        <p className='text-sm font-semibold italic'>*The leaderboard is based on most solved questions</p>
      </div>

<div className='rounded-2xl bg-white shadow-md gap-3 text-center p-5 flex flex-col'>
  <h1 className='font-bold text-xl'>Add Friend</h1>
            <form 
        onSubmit={handlesubmit}
        className="flex flex-col gap-4">
        
          <label className="flex flex-col text-left">
            <span className="mb-1 font-medium text-gray-700">Username</span>
            <input
            value={friendName}
            onChange={(e)=>setFriendName(e.target.value)}
              type="text"
              name="username"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
              required
            />
          </label>
          <button
          
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <h2 className='italic font-semibold text-black'>{msg}</h2>
</div>
    </div>

  )
}

const Leaderboard = ({friends, uname, total}) => {
  // Add the current user to the friends list for leaderboard display
  const friendsWithMe = Array.isArray(friends)
    ? [...friends, { username: uname, totalSolved: total }]
    : [{ username: uname, totalSolved: total }];

  friends = friendsWithMe;

  const sortedFriends = Array.isArray(friends)
    ? [...friends].sort((a, b) => (b.totalSolved || 0) - (a.totalSolved || 0))
    : [];

  return (
    <div className="w-full flex justify-center mt-4 rounded-lg">
      <table className="min-w-[350px] bg-white rounded-lg shadow-lg text-left border border-gray-200">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-6 py-3 font-semibold text-blue-800 border-b border-gray-200">Name</th>
            <th className="px-6 py-3 font-semibold text-blue-800 border-b border-gray-200">Total Solved</th>
          </tr>
        </thead>
        <tbody>
          {sortedFriends.length > 0 ? (
            sortedFriends.map((fr, idx) => (
              <tr key={idx} className={`hover:bg-blue-100 ${fr.username === uname ? "bg-yellow-300" : "bg-[#f0f0f1"} transition-colors`}>
                <td className={`px-6 py-3 border-b font-medium border-gray-500`} >{fr.username}</td>
                <td className="px-6 py-3 border-b font-medium border-gray-500">{fr.totalSolved}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-gray-500 text-center" colSpan={2}>
                No Friends found. Haha. sucks to be you.
              </td>
            </tr>
          )}
        </tbody>
      </table>


    </div>
  )
}

export default Friends