import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton'
// import LoginButton from './LoginButton'

const LogoutPage = () => {
  const { isLoading, error } = useAuth0
  return (
    <div>
      <h1>All done! RSVP form has been successfully submitted</h1>
      <h3>Sign out</h3>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  )
}

export default LogoutPage
