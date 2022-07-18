import nock from 'nock'
import {
  addNewGuest,
  deleteGuestApi,
  getAllGuests,
  getSingleGuest,
  sendEmail,
  updateRsvpGuest,
} from './index'
import { guestsArray } from '../../tests/fake-data'
import { updateGuest } from '../../server/db/db'

describe('getAllGuests', () => {
  const scope = nock('http://localhost')
    .get('/api/v1/guests/')
    .reply(200, guestsArray)

  test('return a list of all guests', () => {
    expect.assertions(5)
    return getAllGuests().then((guests) => {
      expect(guests).toHaveLength(5)
      expect(guests).toEqual(guestsArray)
      expect(guestsArray[0].id).toBe(1)
      expect(Object.keys(guestsArray[0])).toHaveLength(9)
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})

describe('sendEmail', () => {
  const recipient = guestsArray[1]
  const scope = nock('http://localhost')
    .post('/api/v1/guests/send-invites')
    .reply(200)
  test('returns success status 200', () => {
    expect.assertions(2)
    return sendEmail(recipient).then((res) => {
      expect(res.status).toBe(200)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deleteGuestApi', () => {
  const id = guestsArray[3].id
  const scope = nock('http://localhost').delete('/api/v1/guests/').reply(200)
  test('returns success status 200', () => {
    expect.assertions(2)
    return deleteGuestApi(id).then((res) => {
      expect(res.status).toBe(200)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('addNewGuests', () => {
  const newFakeGuest = {
    name: 'Charles',
    email: 'charles@gmail.com',
    plusone: 0,
    plusone_Name: '',
    dietary: 'halal',
    rsvp: 1,
    event_id: 1,
    table_Number: 1,
  }
  const fakeResponse = {
    id: 6,
    name: 'Charles',
    email: 'charles@gmail.com',
    plusone: 0,
    plusone_Name: '',
    dietary: 'halal',
    rsvp: 1,
    event_id: 1,
    table_Number: 1,
  }
  const scope = nock('http://localhost')
    .post('/api/v1/guests/', newFakeGuest)
    .reply(201, fakeResponse)

  test('return a new guest', () => {
    expect.assertions(4)
    return addNewGuest(newFakeGuest).then((res) => {
      expect(res.id).toBe(6)
      expect(res.name).toBe('Charles')
      expect(res.email).toBe('charles@gmail.com')
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})

describe('getSingleGuest', () => {
  const id = guestsArray[0].id
  const scope = nock('http://localhost')
    .get(`/api/v1/rsvp/${id}`)
    .reply(200, guestsArray[0])

  test('returns guest with id = 1', () => {
    expect.assertions(4)
    return getSingleGuest(id).then((res) => {
      expect(res.id).toBe(id)
      expect(res.name).toBe(guestsArray[0].name)
      expect(res.email).toBe(guestsArray[0].email)
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})

//updateRSVPguest

describe('updateRsvpGuest', () => {
  const id = guestsArray[2].id
  const fakeUpdatedGuest = {
    id: 3,
    name: 'Dracuman',
    email: 'dracuman@hotmail.com',
    plusone: 1,
    plusone_Name: 'Fairy',
    dietary: 'blood only',
    rsvp: 1,
    event_id: 1,
    table_Number: 2,
  }

  const scope = nock('http://localhost')
    .patch(`/api/v1/rsvp/${id}`)
    .reply(200, fakeUpdatedGuest)

  test('returns guest with id = 1', () => {
    expect.assertions(5)
    return updateRsvpGuest(id).then((res) => {
      expect(res.id).toBe(3)
      expect(res.name).toBe('Dracuman')
      expect(res.email).toBe('dracuman@hotmail.com')
      expect(res.plusone_Name).toBe('Fairy')
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})
