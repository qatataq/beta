import _ from 'lodash'
import 'whatwg-fetch'

const requestTracks = payload => ({
  type: 'REQUEST_TRACKS',
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

export const fetchCurrentTrack = () =>
  dispatch => {
    dispatch(requestTracks('requesting'))
    return fetch(`https://www.radioking.com/widgets/currenttrack.php?radio=117904&format=json`)
      .then(response => response.json())
      .then((newTrack) => {
        console.log(newTrack);
        dispatch(receiveCurrentTrack(newTrack))
      })
      .catch(error => {        
        console.log(error);
        dispatch(receiveErrorTracks(error))
      })
  }
