import React, { Component } from 'react'
import { connect } from 'react-redux'

import TracksListImpl from './TracksListImpl'

class TracksList extends Component {
  render() {
    return (
      <TracksListImpl {...this.props} />
    )
  }
}

const stateToProps = (state) => ({
  player: state.player,
  tracks: state.tracks,
})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(TracksList);
