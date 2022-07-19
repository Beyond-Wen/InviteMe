import React from 'react'
import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { Text } from '@chakra-ui/react'

export default function rsvp() {
  const { logout } = useAuth0()
  // const location = useLocation()
  // const id = location.pathname.split('/')[2]

  function handleLogoff(e) {
    e.preventDefault()
    logout()
  }

  return (
    <div className="top">
      <Text fontSize={50}>❤️💑🏻❤️</Text>
      <div className="topRight">
        <ul className="topList">
          <Link to="/">
            <li className="topListItem">GUEST LIST</li>
          </Link>
          <Link to="/seatingplan">
            <li className="topListItem">SEATING PLAN</li>
          </Link>
          <IfNotAuthenticated>
            <Link to="/login">
              <li className="topListItem">LOGIN</li>
            </Link>
          </IfNotAuthenticated>
          <IfAuthenticated>
            <li className="topListItem">
              <a href="/" onClick={handleLogoff}>
                LOG OUT
              </a>
            </li>
          </IfAuthenticated>
          {/* <Link to={`/rsvp/${id}`}> */}
          <Link to="/rsvp/1">
            <li className="topListItem">RSVP</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
