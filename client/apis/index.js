const request = require('superagent')

const guestlistUrl = '/api/v1/guests/'

export function getAllGuests() {
  return request.get(guestlistUrl).then((res) => res.body)
}

export function sendEmail(recipient) {
  return request
    .post(`${guestlistUrl}send-invites`)
    .send({ recipient })
    .then((res) => res)
}

export function deleteGuestApi(id) {
  return request
    .delete(guestlistUrl)
    .send({ id })
    .set('Accept', 'application/json')
    .then((res) => res)
    .catch((err) => {
      console.err(err.message)
    })
}

export function addNewGuest(newGuest) {
  // console.log('This is returning from apiClient', newGuest)
  return request
    .post(guestlistUrl)
    .send(newGuest)
    .set('Accept', 'application/json')
    .then((res) => res.body)
    .catch((err) => {
      console.err(err.message)
    })
}

//GET /api/v1/rsvp/:id
export function getSingleGuest(id) {
  return request.get(`/api/v1/rsvp/${id}`).then((res) => res.body)
}

export function updateRsvpGuest(id, updatedGuest) {
  return request
    .patch(`/api/v1/rsvp/${id}`)
    .send(updatedGuest)
    .set('Accept', 'application/json')
    .then((res) => res.body)
    .catch((err) => {
      console.err(err.message)
    })
}
