import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'

import Profile from './Profile'

const LoginPage = () => {
  const { isLoading, error } = useAuth0()
  return (
    <div>

      <h1>Welcome to InviteME</h1>
      <h3>Sign in to respond to your host!</h3>

      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <Profile />
        </>
      )}
    </div>
  )
}

export default LoginPage
