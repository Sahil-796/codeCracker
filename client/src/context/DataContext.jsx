import React , { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'


const DataContext = createContext();

const DataProvider = ({children}) => {

    const [username, setUsername] = useState("")
      const [email, setEmail] = useState("")
      const [friends, setFriends] = useState(null)
      const [platforms, setPlatforms] = useState(null)
      const [platformStats, setplatformStats] = useState(null)
      const [totalSolved, setTotalSolved] = useState()
      const [loading, setLoading] = useState(false)
    
      const [token, setToken] =  useState(()=>Cookies.get('token'))

  useEffect(() => {

      if (!token) {
      setUsername("");
      setEmail("");
      setFriends(null);
      setPlatforms(null);
      setplatformStats(null);
      setTotalSolved(undefined);
      setLoading(false);
      return;
    }
    
    

    setLoading(true);
        
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
        setplatformStats(response.data.platformStats)
        setTotalSolved(response.data.totalSolved)

        

      } catch(err){
        
      }
       finally {
      setLoading(false); // Always set loading to false after fetch
    }
    
    }

    fetchData()
    }, [token])

    return (
    <DataContext.Provider value={{ username, email, friends, platforms, platformStats, loading, token, setToken }}>
      {children}
    </DataContext.Provider>
    )
    

}

export default DataProvider;

export const useData = () => useContext(DataContext);