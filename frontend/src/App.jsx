import { useState } from 'react'
import Login from './component/Login.jsx'
import Signup from './component/Signup.jsx'
import Dashboard from './component/Dashboard.jsx'
import Error404 from './component/Error404.jsx'
import { Routes, Route } from "react-router-dom"
import UserProtectedWrapper from "./component/UserProtectedWrapper.jsx"


function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/' element={<UserProtectedWrapper><Dashboard /></UserProtectedWrapper>} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  )
}
export default App
