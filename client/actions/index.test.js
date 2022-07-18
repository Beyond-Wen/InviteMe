import { fetchGuests } from './index'
import { getAllGuests } from '../apis/index'

const fakeData = [
  {
    id: '1',
    name: 'Ayoung',
    email: 'ayoungleeh@gmail.com',
    plusone: 1,
    plusone_Name: 'Haru',
    dietary: 'none',
    rsvp: 1,
    event_id: 1,
    groupNumber: 1,
  },
  {
    id: '2',
    name: 'Beyond',
    email: 'allstar_beyond@hotmail.com',
    plusone: 1,
    plusone_Name: 'Christina',
    dietary: 'fish',
    rsvp: 1,
    event_id: 1,
    groupNumber: 1,
  },
]

jest.mock('../apis/index')

beforeAll(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
})
afterAll(() => {
  console.error.mockRestore()
})

describe('fetchGuests', () => {
  it('calls fetchGuests and dispatches receiveGuests action when successful', () => {
    const fakeDispatch = jest.fn()
    getAllGuests.mockReturnValue(Promise.resolve(fakeData))
    const thunk = fetchGuests()
    expect.assertions(2)
    return thunk(fakeDispatch).then(() => {
      const action = fakeDispatch.mock.calls[1][0]
      // console.log(fakeDispatch.mock.calls)
      expect(action.type).toBe('RECEIVE_GUESTS')
      expect(action.guests).toEqual(fakeData)
    })
  })

  it('console.logs err when unsuccessful', () => {
    const fakeDispatch = jest.fn()
    getAllGuests.mockImplementation(() =>
      Promise.reject(new Error('guests not found.'))
    )
    const thunk = fetchGuests()
    expect.assertions(1)
    return thunk(fakeDispatch).then(() => {
      const action = fakeDispatch.mock.calls[1][0]
      console.log(action)
      expect(action.type).toBe('SET_ERROR')
    })
  })
})
