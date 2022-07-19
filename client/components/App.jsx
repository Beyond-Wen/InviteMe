import React from 'react'
import RSVPForm from './RSVPForm'
import GuestList from './GuestList'
import SeatingPlan from './SeatingPlan'
import LoginPage from './LoginPage'
import NoMatch from './NoMatch'
import MainLayout from './MainLayout.jsx'
import Callback from './Callback'
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom'
=======
import LogoutPage from './LogoutPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
>>>>>>> dc2666d21b1d6be6379c64bc068a134dd8c67b3e

function App() {
  return (
    <>
      <div className="app">
<<<<<<< HEAD
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
        </Routes>
=======
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
>>>>>>> dc2666d21b1d6be6379c64bc068a134dd8c67b3e
      </div>
    </>
  )
}

export default App
