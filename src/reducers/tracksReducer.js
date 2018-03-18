import _ from 'lodash'

const tracks = [{
  "artist": "Brasstracks",
  "title": "Those Who Know",
  "album": null,
  "cover": "https://d1taocs3kfk7z6.cloudfront.net/track/cover/c7e2c0bc-e78b-4955-9064-e597aa4e41bb",
  "buy_link": null,
  "started_at": "2017-12-23T13:36:23+0000",
  "end_at": "2017-12-23T13:39:42+0000",
  "duration": 198.502
},{
  "artist": "Brasstracks",
  "title": "Those Who Know",
  "album": null,
  "cover": "https://d1taocs3kfk7z6.cloudfront.net/track/cover/c7e2c0bc-e78b-4955-9064-e597aa4e41bb",
  "buy_link": null,
  "started_at": "2017-12-23T13:36:23+0000",
  "end_at": "2017-12-23T13:39:42+0000",
  "duration": 198.502
},{
  "artist": "Brasstracks",
  "title": "Those Who Know",
  "album": null,
  "cover": "https://d1taocs3kfk7z6.cloudfront.net/track/cover/c7e2c0bc-e78b-4955-9064-e597aa4e41bb",
  "buy_link": null,
  "started_at": "2017-12-23T13:36:23+0000",
  "end_at": "2017-12-23T13:39:42+0000",
  "duration": 198.502
},{
  "artist": "Brasstracks",
  "title": "Those Who Know",
  "album": null,
  "cover": "https://d1taocs3kfk7z6.cloudfront.net/track/cover/c7e2c0bc-e78b-4955-9064-e597aa4e41bb",
  "buy_link": null,
  "started_at": "2017-12-23T13:36:23+0000",
  "end_at": "2017-12-23T13:39:42+0000",
  "duration": 198.502
},{
  "artist": "Brasstracks",
  "title": "Those Who Know",
  "album": null,
  "cover": "https://d1taocs3kfk7z6.cloudfront.net/track/cover/c7e2c0bc-e78b-4955-9064-e597aa4e41bb",
  "buy_link": null,
  "started_at": "2017-12-23T13:36:23+0000",
  "end_at": "2017-12-23T13:39:42+0000",
  "duration": 198.502
},{
  "artist": "Brasstracks",
  "title": "Those Who Know",
  "album": null,
  "cover": "https://d1taocs3kfk7z6.cloudfront.net/track/cover/c7e2c0bc-e78b-4955-9064-e597aa4e41bb",
  "buy_link": null,
  "started_at": "2017-12-23T13:36:23+0000",
  "end_at": "2017-12-23T13:39:42+0000",
  "duration": 198.502
},{
  "artist": "Brasstracks",
  "title": "Those Who Know",
  "album": null,
  "cover": "https://d1taocs3kfk7z6.cloudfront.net/track/cover/c7e2c0bc-e78b-4955-9064-e597aa4e41bb",
  "buy_link": null,
  "started_at": "2017-12-23T13:36:23+0000",
  "end_at": "2017-12-23T13:39:42+0000",
  "duration": 198.502
},{
  "artist": "Brasstracks",
  "title": "Those Who Know",
  "album": null,
  "cover": "https://d1taocs3kfk7z6.cloudfront.net/track/cover/c7e2c0bc-e78b-4955-9064-e597aa4e41bb",
  "buy_link": null,
  "started_at": "2017-12-23T13:36:23+0000",
  "end_at": "2017-12-23T13:39:42+0000",
  "duration": 198.502
}]

const DEFAULT_STATE = {
  list: [],
  loading: false,
  error: null,
  isNextTrackReady: false
}

const mergeArrays = (list, payload) => {
  const trackIndex = _.findIndex(list, track => (track.id === payload.id))
  if (trackIndex !== -1) { //update track information
    list[trackIndex] = payload;
  } else if (payload.album !== 'qatataq') { //add new track
    list = [payload, ...list];
  }
  return list;
}

const tracksReducer = (state = DEFAULT_STATE, action: Object) => {
  switch (action.type) {
  case 'REQUEST_TRACKS':
    return {
      ...state
    }
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
      isNextTrackReady: _.findIndex(state.list, track => (track.id === action.payload.id)) === -1
    }
  case 'RECEIVE_HISTORY':
    return {
      ...state,
      loading: false,
      list: action.payload
    }
  default:
    return { ...state }
  }
}

export default tracksReducer
