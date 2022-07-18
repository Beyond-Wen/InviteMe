const express = require('express')
const db = require('../db/db')
const router = express.Router()
const { sendEmail } = require('../emailTest')

//GET all guests /api/v1/guests
router.get('/', (req, res) => {
  db.getGuests()
    .then((guests) => {
      res.json(guests)
      return null
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/send-invites', (req, res) => {
  const { recipient } = req.body
  sendEmail(recipient)
    .then((info) => {
      console.log('send-invitres line 23', info)
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

//delete guest/ api/v1/guests
router.delete('/', (req, res) => {
  const { id } = req.body
  db.deleteGuest(id)
    .then((guest) => {
      res.json(guest)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

//POST add a guest api/v1/guests
router.post('/', (req, res) => {
  const {
    name,
    email,
    plusone,
    plusone_Name,
    dietary,
    rsvp,
    event_id,
    groupNumber,
  } = req.body
  db.addGuest({
    name,
    email,
    plusone,
    plusone_Name,
    dietary,
    rsvp,
    event_id,
    groupNumber,
  })
    .then((newId) => {
      // console.log('This is returning from routes', newId)
      res.json(newId)
      return null
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong!' })
    })
})

// PATCH guest api/v1/guests
router.patch('/:id', (req, res) => {
  const id = req.params.id
  const guest = req.body

  db.updateGuest(id, guest)
    .then((guest) => {
      guest.id = id
      res.json(guest)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Something went wrong!')
    })
})

//GET single guest /api/v1/guests/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.findGuestById(id)
    .then((guest) => {
      res.json(guest)
      return null
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

//UPDATE single guest /api/v1/guests/:id
router.patch('/:id', (req, res) => {
  const id = Number(req.body.params)
  const { name, email, plusone, plusoneName, dietary, rsvp } = req.body
  db.updateGuestById(id, { name, email, plusone, plusoneName, dietary, rsvp })
    .then((updatedGuest) => {
      res.json(updatedGuest)
      return null
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/by-email/:email', (req, res) => {
  const email = req.params.email
  console.log(email)
  db.findGuestByEmail(email)
    .then((guest) => {
      res.json(guest)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
