import React from 'react'

import Audio from './Audio/Audio'
import TracksList from './TracksList/TracksList'

import '../styles/Content.css'

const Content = () => (
  <div className="content">
    <TracksList {...this.props} />
    <Audio {...this.props} />
  </div>
)

export default Content
