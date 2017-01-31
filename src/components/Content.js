import React from 'react'

import Audio from './Audio/Audio'
import Controls from './Controls/Controls'
import Info from './Info'
import TracksList from './TracksList/TracksList'

import '../styles/Content.css'

const Content = () => (
  <div className='content'>
    <Audio />
    <Controls />
    <Info />
    <TracksList />
  </div>
)

export default Content
