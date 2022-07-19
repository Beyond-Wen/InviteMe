import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout
