import _ from 'lodash'
import moment from 'moment'
import 'whatwg-fetch'
import hash from 'quick-hash'

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

const receiveCurrentTrack = (payload) => ({
  type: 'RECEIVE_CURRENT_TRACK',
  payload
})

const receiveHistory = payload => ({
  type: 'RECEIVE_HISTORY',
  payload,
})


const addIdToTracks = (tracks) => {
  return tracks.map(track => ({
    id : hash(track.started_at),
    ...track
  }));
}

export const fetchCurrentTrack = () =>
  dispatch => {
    dispatch(requestTracks('requestingCurrentTrack'))
    return fetch(`https://www.radioking.com/widgets/currenttrack.php?radio=117904&format=json`)
      .then(response => response.json())
      .then((newTrack) => {
        dispatch(receiveCurrentTrack(...addIdToTracks([newTrack])))
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
        history = addIdToTracks(history);
        dispatch(receiveHistory(history.filter(track => track.album !== 'qatataq')));
      })
      .catch(error => {
        console.log(error);
        dispatch(receiveErrorTracks(error))
      })
  }
