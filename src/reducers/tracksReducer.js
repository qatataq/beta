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
}

const mergeArrays = (list, payload) => {
  if (_.head(list) && _.head(list).duration === null && _.head(list).started_at === payload.started_at) {
    list[0] = payload;
    return(list);
  }
  return _.get(_.head(list), 'started_at') !== payload.started_at && payload.album !== 'qatataq'
      ? [payload, ...list] 
      : list;
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
      list: mergeArrays(state.list, action.payload)
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
