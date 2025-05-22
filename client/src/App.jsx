import React from 'react'
import Register from './pages/Register'
import Login from './pages/login'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import AuthProvider from './context/authContext'
import DataProvider from './context/DataContext'
import Layout from './components/Layout'
import Friends from './pages/Friends'
import AddPlatform from './pages/AddPlatform'


const App = () => {


 return (


<AuthProvider>
  <DataProvider>
     <BrowserRouter>

      <Routes>
        {/* routes */}
        {/* <Route path="/" element={<Dashboard />}/>  */}
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>


        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/friends' element={<Friends/>}/>
          <Route path='/AddPlatform' element={<AddPlatform/>}/>
          
        </Route>
      </Routes>
     


    </BrowserRouter>
    </DataProvider>
</AuthProvider>
  )
}

export default App