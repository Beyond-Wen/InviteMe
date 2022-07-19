const request = require('supertest')
const db = require('../db/db')
const server = require('../server')

jest.mock('../db/db.js')

const guestMock = [
  {
    id: '10',
    name: 'Ben',
    email: 'ben@gmail.com',
    plusone: true,
    plusone_Name: 'Tom',
    dietary: 'N/A',
    rsvp: true,
    event_id: 1,
    groupNumber: 2,
  },
  {
    id: '9',
    name: 'bob',
    email: 'bobbie@hotmail.com',
    plusone: true,
    plusone_Name: 'ben',
    dietary: 'fish',
    rsvp: false,
    event_id: 1,
    groupNumber: 2,
  },
]
// using mock to test so we don't need to update tests everytime db changes.
describe('mock route data', () => {
  test('GET /api/v1/guests', () => {
    expect.assertions(2)
    db.getGuests.mockImplementation(() => Promise.resolve(guestMock))
    return request(server)
      .get('/api/v1/guests')
      .expect(200)
      .then((res) => {
        expect(res.body).toStrictEqual(guestMock) // wanting to return my fake data here.. toBeStrickEqual, wants it to be the identicale
        expect(res.body).toHaveLength(2)
      })
  })
  // test('POST route test', () => {
  //   const addGuest = {
  //     name: 'Benjamin',
  //     email: 'ben@devacademy.co.nz',
  //     plusone:  true,
  //     plusone_name: 'Savannah',
  //     dietary: 'Dairy products',
  //     rsvp: true,
  //     event_id: 6,
  //     groupNumber: 7,
  //   }
  //   expect.assertions(2)
  //   return db
  //   .addGuest
  //   .getGuests.mockImplementation(() => Promise.resolve(addGuest))
  //   .request(server)
  //     .get('/api/v1/guests')
  //     .expect(200)
  //     .then((result) => {
  //       expect(result[3].name).toBe('Benjamin')
  //       expect(result).toHaveLength(3)
  //     })
  // })


})
