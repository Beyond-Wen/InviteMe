import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchGuests, addGuest } from '../actions'
import { Input, Select, Button, Text, Box } from '@chakra-ui/react'
;<link
  href="https://fonts.googleapis.com/css?family=Montserrat:300,700|Playfair+Display:400i"
  rel="stylesheet"
></link>

export default function AddGuests() {
  const initialState = {
    name: '',
    email: '',
    rsvp: '1',
    plusone: '0',
    plusone_Name: '',
    dietary: '',
    event_id: '',
    groupNumber: '',
  }
  const [guest, setGuest] = useState(initialState)

  const dispatch = useDispatch()

  function handleChange(e) {
    e.preventDefault()
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // console.log('Submit btn was clicked!!')
    dispatch(addGuest(guest))
    setGuest(initialState)
    dispatch(fetchGuests())
  }

  useEffect(() => {
    dispatch(fetchGuests)
  }, [])

  return (
    <Box ml={2}>
      <Text color="white" fontSize="6xl" fontWeight="extrabold">
        Invite your friends and family!
      </Text>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Guest Name:
          </Text>
        </label>
        <Input
          id="name"
          type="text"
          name="name"
          value={guest.name}
          onChange={handleChange}
          placeholder="Please fill in your name"
          color="tomato"
          _placeholder={{ color: 'inherit' }}
          bgColor="#FFF8BE"
        />
        <br></br>
        <br></br>
        <label htmlFor="email">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Email:
          </Text>
        </label>
        <Input
          id="email"
          type="text"
          name="email"
          value={guest.email}
          onChange={handleChange}
          placeholder="Please fill in your email address"
          color="tomato"
          _placeholder={{ color: 'inherit' }}
          bgColor="#FFF8BE"
        />
        <br></br>
        <br></br>
        <p>
          <label htmlFor="rsvp">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Are you coming?
            </Text>
          </label>
        </p>
        <Select
          name="rsvp"
          value={guest.rsvp}
          onChange={(evt) => handleChange(evt)}
          placeholder="Please fill in your name"
          color="tomato"
          _placeholder={{ color: 'inherit' }}
          bgColor="#FFF8BE"
        >
          <option name="rsvp" value="1">
            Yeeea!
          </option>
          <option name="rsvp" value="0">
            Yeah, but Naaah
          </option>
        </Select>
        <br></br>
        <p>
          <label htmlFor="plusone">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Would you like to bring a plus one?
            </Text>
          </label>
        </p>
        <Select
          name="plusone"
          value={guest.plusone}
          onChange={(evt) => handleChange(evt)}
          placeholder="Please fill in your name"
          color="tomato"
          _placeholder={{ color: 'inherit' }}
          bgColor="#FFF8BE"
        >
          <option name="plusone" value="0">
            No, I fly solo.
          </option>
          <option name="plusone" value="1">
            Yes, I can't be alone for 5 minutes.
          </option>
        </Select>
        <br></br>
        <label htmlFor="plusone_Name">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Name of Plus One:
          </Text>
        </label>
        <Input
          id="plusone_Name"
          type="text"
          name="plusone_Name"
          value={guest.plusone_Name}
          onChange={handleChange}
          placeholder="Please fill in the name of your plusone"
          color="tomato"
          _placeholder={{ color: 'inherit' }}
          bgColor="#FFF8BE"
        />
        <br></br>
        <br></br>
        <label htmlFor="dietary">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Dietary:
          </Text>
        </label>
        <Input
          id="dietary"
          type="text"
          name="dietary"
          value={guest.dietary}
          onChange={handleChange}
          placeholder="Please fill in your dietary requirements"
          color="tomato"
          _placeholder={{ color: 'inherit' }}
          bgColor="#FFF8BE"
        />
        <br></br>
        <br></br>
        <label htmlFor="event_id">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Event Id:
          </Text>
        </label>
        <Input
          id="event_id"
          type="text"
          name="event_id"
          value={guest.event_id}
          onChange={handleChange}
          placeholder="Please fill in the event id"
          color="tomato"
          _placeholder={{ color: 'inherit' }}
          bgColor="#FFF8BE"
        />
        <br></br>
        <br></br>
        <label htmlFor="groupNumber">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Group Number:
          </Text>
        </label>
        <Input
          id="groupNumber"
          type="text"
          name="groupNumber"
          value={guest.groupNumber}
          onChange={handleChange}
          placeholder="Please fill in your group number"
          color="tomato"
          _placeholder={{ color: 'inherit' }}
          bgColor="#FFF8BE"
        />
        <br></br>
        <br></br>

        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
        <br></br>
        <br></br>
      </form>
    </Box>
  )
}
