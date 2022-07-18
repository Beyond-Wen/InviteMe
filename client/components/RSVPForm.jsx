import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateGuest } from '../actions'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import request from 'superagent'

async function getGuestByEmail(email) {
  return request.get(`/api/v1/guests/by-email/${email}`).then((res) => res.body)
}

const initialState = {
  name: '',
  email: '',
  rsvp: '0',
  plusone: '0',
  plusone_Name: '',
  dietary: '',
  event_id: '',
  groupNumber: '',
}

export default function RSVPForm() {
  const [guest, setGuest] = useState(initialState)
  const { isAuthenticated, isLoading, user } = useAuth0()
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        checkUser()
      } else {
        localStorage.setItem('redirect_url', `/rsvp/${id}`)
        navigate(`/login`)
      }
    }

    async function checkUser() {
      const guest = await getGuestByEmail(user.email)
      if (guest.id !== Number(id)) {
        navigate('*')
      } else {
        console.log(guest)
        setGuest(guest)
      }
    }
  }, [isLoading, isAuthenticated, user])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    dispatch(updateGuest({ id, ...guest }))

    setGuest(initialState)
    // navigate('/login')
    navigate('/logout')
  }

  const handleChange = (evt) => {
    const key = evt.target.name
    const value = evt.target.value
    let prev = { ...guest }
    prev[key] = value
    setGuest(prev)
  }

  return (
    <div className="rsvpform">
      <h1>We are pleased to invite you to our wedding!</h1>
      <h2>Please confirm your attendance below:</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="guestName">Your Full Name</label>
        </p>
        <input
          placeholder={guest.name}
          id="name"
          type="text"
          name="name"
          value={guest.name}
          onChange={(evt) => handleChange(evt)}
        />
        <p>
          <label htmlFor="guestEmail">Your Email Address</label>
        </p>
        <input
          placeholder={guest.email}
          id="email"
          type="text"
          name="email"
          value={guest.email}
          onChange={(evt) => handleChange(evt)}
        />
        <p>
          <label htmlFor="rsvp">Are you coming?</label>
        </p>
        <select
          name="rsvp"
          value={guest.rsvp}
          onChange={(evt) => handleChange(evt)}
        >
          <option name="rsvp" value="1">
            Yeeea!
          </option>
          <option name="rsvp" value="0">
            Yeah, but Naaah
          </option>
        </select>
        <p>
          <label htmlFor="plusone">Would you like to bring a plus one?</label>
        </p>
        <select
          name="plusone"
          value={guest.plusone}
          onChange={(evt) => handleChange(evt)}
        >
          <option name="plusone" value="0">
            No, I fly solo.
          </option>
          <option name="plusone" value="1">
            {"Yes, I can't be alone for 5 minutes."}
          </option>
        </select>
        <p>
          <label htmlFor="plusone_Name">Full Name of Your Plus One</label>
        </p>
        <input
          placeholder={guest.plusone_Name}
          id="plusone_Name"
          type="text"
          name="plusone_Name"
          value={guest.plusone_Name}
          onChange={(evt) => handleChange(evt)}
        />
        <p>
          <label htmlFor="dietary">Dietary Restrictions</label>
        </p>
        <input
          placeholder={guest.dietary}
          id="dietary"
          type="text"
          name="dietary"
          value={guest.dietary}
          onChange={(evt) => handleChange(evt)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
