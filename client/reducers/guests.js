import {
  RECEIVE_GUESTS,
  ADD_GUEST,
  SET_GUEST,
  ADD_GUESTS_SUCCESS,
} from '../actions'

const initialState = []

const guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GUESTS:
      return action.guests
    case ADD_GUESTS_SUCCESS:
      return [...state, action.guests]
    case ADD_GUEST:
      return [...state, action.payload]
    case SET_GUEST:
      return action.payload

    default:
      return state
  }
}

export default guestsReducer
