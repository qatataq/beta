import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import player from './reducers/playerReducer'
import tracks from './reducers/tracksReducer'

export default createStore(
  combineReducers({
    player,
    tracks,
  }),
  {},
  applyMiddleware(thunk, logger())
)
