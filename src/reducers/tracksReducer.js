import { findIndex, find } from 'lodash'

const DEFAULT_STATE = {
  list: [],
  loading: false,
  error: null,
  isNextTrackReady: false,
}

const mergeArrays = (list, payload) => {
  const trackIndex = findIndex(list, track => track.id === payload.id)
  if (trackIndex !== -1) {
    //update track information
    list[trackIndex] = payload
  } else if (payload.album !== 'qatataq') {
    //add new track
    list = [payload, ...list]
  }
  return list
}

const tracksReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'REQUEST_TRACKS':
      return state
    case 'REQUEST_HISTORY':
      return {
        ...state,
        loading: true,
      }
    case 'TRACKS_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    case 'RECEIVE_CURRENT_TRACK':
      return {
        ...state,
        list: mergeArrays(state.list, action.payload),
        isNextTrackReady: !!find(
          state.list,
          track => track.id === action.payload.id
        ),
      }
    case 'RECEIVE_HISTORY':
      return {
        ...state,
        loading: false,
        list: action.payload,
      }
    default:
      return state
  }
}

export default tracksReducer
