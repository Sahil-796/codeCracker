import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import axios from 'axios'



const Dashboard = () => {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [friends, setFriends] = useState([])
  const [platforms, setPlatforms] = useState([])

  const [unauthorized, setUnauthorized] = useState(false)

    const token = localStorage.getItem('token')
     
  
    
    useEffect( () => {
      const fetchData = async() => {
      try{
        const response = await axios.get('http://localhost:5000/api/me',{

          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setEmail(response.data.email)
        setUsername(response.data.username)
        setFriends(response.data.friends)
        setPlatforms(response.data.platforms)


      } catch(err){
        if(err.response && err.response.status === 401){
          localStorage.removeItem('token')
          setUnauthorized(true)
        }
      }
    
    }

    fetchData()
    }, [token])

    if (!token || unauthorized) {
      return <Navigate to='/login' replace/>
    }

  return (
    <div>
        

        Hello {username}, with email {email}. Your friends are {friends} and platofroms are {platforms}
    </div>
  )
}

export default Dashboard