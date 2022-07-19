import '@testing-library/jest-dom'
import React from 'react'
import App from './App.jsx'
import guests from '../reducers'
import { setGuest } from '../actions/index.js'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import Navbar from './Navbar'
import GuestList from './GuestList'
import { guestsArray } from '../../tests/fake-data'

const fakeStore = {
  subscribe: jest.fn(),
  getState: jest.fn(() => {
    return {
      guests: {
        data: guestsArray,
        loading: false,
        error: null,
      },
    }
  }),
  dispatch: jest.fn(),
}

jest.mock('./Navbar.jsx')
jest.mock('./GuestList.jsx')

describe('<App />', () => {
  it('renders the Navigation and Home Page default Route', () => {
    Navbar.mockReturnValue(<div>Navbar Component</div>)
    GuestList.mockReturnValue(<div>GuestList Component</div>)
    render(
      <Provider store={fakeStore}>
        <Router initialEntries={['/']}>
          <App />
        </Router>
      </Provider>
    )
    expect(screen.getByText('Navbar Component')).toBeInTheDocument()
    expect(screen.getByText('GuestList Component')).toBeInTheDocument()
  })

  it('renders 404 when URL is garbage', () => {
    render(
      <Provider store={fakeStore}>
        <Router initialEntries={['/helloworld']}>
          <App />
        </Router>
      </Provider>
    )

    expect(screen.getByText(/404/i)).toBeInTheDocument()
  })
})
