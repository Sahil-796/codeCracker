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
      const [isAuthenticated, setIsAuthenticated] = useState(!!token);

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
        
        const response = await axios.get('https://codecracker-bd72.onrender.com/api/me',{
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
          if(err.response && err.response.stats === 401){
            Cookies.remove('token')
            setIsAuthenticated(false)
          }
      }
       finally {
      setLoading(false); 
    }
    
    }

    fetchData()
    }, [token])

    return (
    <DataContext.Provider value={{ username, email, totalSolved, friends, platforms, platformStats, loading, token, setToken, isAuthenticated, setIsAuthenticated }}>
      {children}
    </DataContext.Provider>
    )
    

}

export default DataProvider;

export const useData = () => useContext(DataContext);