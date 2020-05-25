import React from 'react'

import Audio from './Audio/Audio'
import TracksList from './TracksList/TracksList'

import '../styles/Content.css'

const Content = (props) => (
  <div className="content">
    <TracksList {...props} />
    <Audio {...props} />
  </div>
)

export default Content
