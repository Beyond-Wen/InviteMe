import React from 'react'
import RSVPForm from './RSVPForm'
import GuestList from './GuestList'
import SeatingPlan from './SeatingPlan'
import LoginPage from './LoginPage'
import NoMatch from './NoMatch'
import MainLayout from './MainLayout.jsx'
import Callback from './Callback'

import { Route, Routes } from 'react-router-dom'

import LogoutPage from './LogoutPage'

function App() {
  return (
    <>
      <div className="app">
        {/* <Navbar /> */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route exact path="/" element={<GuestList />} />
            <Route exact path="/seatingplan" element={<SeatingPlan />} />
          </Route>
          <Route exact path="/rsvp/:id" element={<RSVPForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
