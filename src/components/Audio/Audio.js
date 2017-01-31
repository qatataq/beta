import React, { Component } from 'react'
import { connect } from 'react-redux'

import AudioImpl from './AudioImpl'

class Audio extends Component {
  render() {
    return (
      <AudioImpl {...this.props} />
    )
  }
}

const stateToProps = (state) => ({
  player: state.player,
  tracks: state.tracks,
})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(Audio);
