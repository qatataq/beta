import React, { Component } from 'react'
import { connect } from 'react-redux'

import TracksListImpl from './TracksListImpl'

class TracksList extends Component {
  render() {
    const { player, tracks } = this.props
    const render =
    player && tracks ?
      <TracksListImpl {...this.props} />
    :
      null
      
    return render
  }
}

const stateToProps = (state) => ({
  player: state.player,
  tracks: state.tracks,
})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(TracksList);
