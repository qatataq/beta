import React from 'react'

import Audio from './Audio/Audio'
import Info from './Info'
import TracksList from './TracksList/TracksList'

import '../styles/Content.css'

const Content = () => (
  <div className='content'>
    <Audio />
    <Info />
    <TracksList />
  </div>
)

export default Content
