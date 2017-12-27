import _ from 'lodash'
import 'whatwg-fetch'

const requestTracks = payload => ({
  type: 'REQUEST_TRACKS',
  payload,
})

const requestHistory = payload => ({
  type: 'REQUEST_HISTORY',
  payload,
})

const receiveErrorTracks = payload => ({
  type: 'TRACKS_ERROR',
  payload,
})

const receiveCurrentTrack = payload => ({
  type: 'RECEIVE_CURRENT_TRACK',
  payload,
})

const receiveHistory = payload => ({
  type: 'RECEIVE_HISTORY',
  payload,
})


export const fetchCurrentTrack = () =>
  dispatch => {
    dispatch(requestTracks('requestingCurrentTrack'))
    return fetch(`https://www.radioking.com/widgets/currenttrack.php?radio=117904&format=json`)
      .then(response => response.json())
      .then((newTrack) => {
        dispatch(receiveCurrentTrack(newTrack))
      })
      .catch(error => {        
        console.log(error);
        dispatch(receiveErrorTracks(error))
      })
  }

export const fetchHistory = () =>
  dispatch => {
    dispatch(requestHistory('requestingHistory'))
    return fetch(`https://www.radioking.com/widgets/api/v1/radio/117904/track/history?limit=20`)
      .then(response => response.json())
      .then((history) => {
        dispatch(receiveHistory(history.filter(track => track.album !== 'qatataq')))
      })
      .catch(error => {        
        console.log(error);
        dispatch(receiveErrorTracks(error))
      })
  }
