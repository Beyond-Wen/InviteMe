const db = require('./db')

const knex = require('knex')
const testConfig = require('../db/knexfile').test // Test Database
const testDb = knex(testConfig)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(async () => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('test db functions', () => {
  it('tests the getGuests function', () => {
    expect.assertions(2)
    return db.getGuests(testDb).then((result) => {
      expect(result[0].name).toBe('Ayoung')
      expect(result).toHaveLength(5)
    })
  })
  it('tests the addGuest function', () => {
    const addGuest = {
      name: 'Benjamin',
      email: 'ben@devacademy.co.nz',
      plusone:  true,
      plusone_name: 'Savannah',
      dietary: 'Dairy products',
      rsvp: true,
      event_id: 6,
      groupNumber: 7,
    }
    expect.assertions(2)
    return db
      .addGuest(addGuest, testDb)
      .then(() => {
        return db.getGuests(testDb)
      })
      .then((result) => {
        expect(result[5].name).toBe('Benjamin')
        expect(result).toHaveLength(6)
      })
  })
  it('tests the deleteGuest function', () => {
    expect.assertions(2)
    return db
      .deleteGuest(1, testDb)
      .then(() => {
        return db.getGuests(testDb)
      })
      .then((result) => {
        expect(result[0].name).toBe('Beyond')
        expect(result).toHaveLength(4)
      })
  })
  it('test the updateGuest', () => {
    expect.assertions(2)
    const patchGuest = {
      name: 'Ngairo',
    }
    return db
      .updateGuest(3, patchGuest, testDb) // 1: update data user name: 'Angela
      .then(() => {
        return db.getGuests(testDb) // 2: receive all guests
      })
      .then((result) => {
        // 3: access the returned guests
        expect(result[2].name).toBe('Ngairo')
        expect(result).toHaveLength(5)
      })
  })
  it('tests the findGuestByEmail function', () => {
    expect.assertions(2)
    return db.getGuests(testDb).then((result) => {
      expect(result[0].email).toBe('ayoungleeh@gmail.com')
      expect(result).toHaveLength(5)
    })
  })
  it('tests the findGuestById function', () => {
    expect.assertions(3)
    return db.getGuests(testDb).then((result) => {
      expect(result[1].id).toBe(2)
      expect(result[1].name).toBe('Beyond')
      expect(result).toHaveLength(5)
  })
  })
})