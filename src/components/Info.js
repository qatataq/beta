import React, { Component } from 'react'
import _ from 'lodash'

import '../styles/Info.css'

class Info extends Component {

  render() {
    const { tracks } = this.props
    const currentTrack = _.head(tracks.list);

    return (
      <div className="is-fadeIn">
        {currentTrack &&
          <div className="Info">
            <div className="Info-title">{currentTrack.title}</div>
            <div className="Info-artist">{currentTrack.artist}</div>
            <div className="Info-label">Test</div>
          </div>
        }
      </div>
    )
  }
}

export default Info
