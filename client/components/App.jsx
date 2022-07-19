import React from 'react'
import RSVPForm from './RSVPForm'
import GuestList from './GuestList'
import SeatingPlan from './SeatingPlan'
import LoginPage from './LoginPage'
import NoMatch from './NoMatch'
import MainLayout from './MainLayout.jsx'
import Callback from './Callback'
import LogoutPage from './LogoutPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="app">
        <Router>
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
        </Router>
      </div>
    </>
  )
}

export default App
