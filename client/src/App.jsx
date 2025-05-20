import React from 'react'
import Register from './pages/Register'
import Login from './pages/login'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import AuthProvider from './context/authContext'
import Layout from './components/Layout'
import Friends from './pages/Friends'

const App = () => {

  const token = localStorage.getItem("token");

 return (


<AuthProvider>
     <BrowserRouter>

      <Routes>
        {/* routes */}
        {/* <Route path="/" element={<Dashboard />}/>  */}
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>


        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/friends' element={<Friends/>}/>
          
        </Route>
      </Routes>
     


    </BrowserRouter>
</AuthProvider>
  )
}

export default App