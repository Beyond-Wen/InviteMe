import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
  const { user, isAuthenticated } = useAuth0()

  return (
    isAuthenticated && (
      <article className="column">
        {/* {JSON.stringify(user)} */}
        {/* {user?.picture && <img src={user.picture} alt={user?.name} />} */}
        <h2 aria-label="login message" className="login-welcome">
          {`Thank you, ${user?.name}`}
        </h2>
      </article>
    )
  )
}

export default Profile
