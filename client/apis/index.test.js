import nock from 'nock'
import { addNewGuest, getAllGuests } from './index'
import { guestsArray } from '../../tests/fake-data'

describe('getAllGuests', () => {
  const scope = nock('http://localhost')
    .get('/api/v1/guests/')
    .reply(200, guestsArray)

  test('return a list of all guests', () => {
    expect.assertions(5)
    return getAllGuests().then((guests) => {
      expect(guests).toHaveLength(5)
      expect(guests).toEqual(guestsArray)
      expect(guestsArray[0].id).toBe('1')
      expect(Object.keys(guestsArray[0])).toHaveLength(9)
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})

// describe('sendEmail')
//
//
// describe('deleteGuestApi', () => {
//   const scope = nock('http://localhost')
//     .get('/api/v1/guests/')
//     .reply(200, guestsArray)
// })

describe('addNewGuests', () => {
  const newFakeGuest = {
    id:'6'
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
    id: '6',
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
    .get('/api/v1/guests/', newFakeGuest)
    .reply(200, fakeResponse)

  test('return a new guest', () => {
    expect.assertions(3)
    return addNewGuest(newFakeGuest).then((response) => {
      console.log(newFakeGuest)
      expect(response.id).toBe('6')
      expect(response.name).toBe('Charles')
      expect(scope.isDone()).toBe(true)
      return null
      console.log()
    })
  })
})
