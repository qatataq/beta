import React, { Component } from 'react'

import '../styles/Info.css'

class Info extends Component {

  render() {
    const { tracks } = this.props
    const currentTrack = tracks.list[tracks.list.length - 1];

    return (
      <div className="is-fadeIn">
        {currentTrack &&
          <div className="Info">
            <div className="Info-title">{currentTrack.title}</div>
            <div className="Info-artist">{currentTrack.artist}</div>
            <div className="Info-label">{currentTrack.album}</div>
          </div>
        }
      </div>
    )
  }
}

export default Info
