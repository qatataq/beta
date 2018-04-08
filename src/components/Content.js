import React, { Component } from 'react'
import { connect } from 'react-redux'

import Audio from './Audio/Audio'
import TracksList from './TracksList/TracksList'

import '../styles/Content.css'

class Content extends Component {
  render() {
    const { player, tracks } = this.props
    const render = player &&
      tracks && (
        <div className="content">
          <TracksList {...this.props} />
          <Audio {...this.props} />
        </div>
      )

    return render
  }
}

const stateToProps = state => ({
  player: state.player,
  tracks: state.tracks,
})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(Content)
