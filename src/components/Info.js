import React, { Component } from 'react'
import { head } from 'lodash'

import '../styles/Info.css'

class Info extends Component {
  render() {
    const { tracks, trackFocused } = this.props
    const currentTrack = trackFocused ? trackFocused : head(tracks.list)

    return (
      <div className="is-fadeIn">
        {currentTrack && (
          <div className="Info">
            <div className="Info-title">{currentTrack.title}</div>
            <div className="Info-artist">{currentTrack.artist}</div>
          </div>
        )}
      </div>
    )
  }
}

export default Info
