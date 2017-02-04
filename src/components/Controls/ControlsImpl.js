import React, { Component } from 'react'
import { connect } from 'react-redux'
import Velocity from 'velocity-animate'
import _ from 'lodash'
import {
  PlayPause,
  Next,
  Previous,
  Sound,
} from '../Icons'
import {
  nextTrack,
  previousTrack,
  togglePlaying,
  updateVolume,
} from '../../actions/playerActions'
import '../../styles/Controls.css'

class ControlsImpl extends Component {

  handleNextTrack = (direction) => (event) => {
    const {
      nextTrack,
      player,
      previousTrack,
      tracks,
    } = this.props
    const element = event.currentTarget
    const animAttr = direction === 'next' ? { translateX: '8px' } : { translateX: '-8px' }
    const animParams = { duration:200, easing: [.13,1.67,.72,2] }

    Velocity(element, animAttr, animParams)
    Velocity(element, 'reverse', animParams)
        .then(() => {
          Velocity(element, 'stop', true)
          if (direction === 'next') {
            nextTrack(player.index, tracks.list)
          } else {
            previousTrack(player.index, tracks.list)
          }
        })
  }

  handlePlayPause = (event) => {
    const { player, togglePlaying } = this.props
    const element = event.currentTarget
    const animAttr = { scaleX: '0.3', scaleY: '0.3', opacity: '0' }
    const animParams = { duration:200, easing: [.13,1.67,.72,2] }
    const onComplete = {
      complete: () => {
        togglePlaying(player.playing)
        Velocity(element, 'reverse', animParams)
          .then(() => {
            Velocity(element, 'stop', true)
          })
      },
    }

    Velocity(element, animAttr, _.extend(animParams, onComplete))
  }

  render() {
    const {
      player,
      updateVolume,
    } = this.props
    return (
      <div className="Controls is-fadeIn">
      {player.track && (
        <div>
          <div className="row">
            <Previous
              className="Controls-space"
              onClick={this.handleNextTrack('previous')}
            />
            <PlayPause
              className="Controls-space"
              isPlaying={player.playing}
              onClick={this.handlePlayPause}
            />
            <Next onClick={this.handleNextTrack('next')}/>
          </div>
          <div className="row">
            <Sound
              className={'Controls-sound'}
              volume={player.volume}
              onChange={(event) => { updateVolume(event.target.value) }}
            />
          </div>
        </div>
      )}
      </div>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = (dispatch) => ({
  nextTrack: (index, list) => { dispatch(nextTrack(index, list)) },
  previousTrack: (index, list) => { dispatch(previousTrack(index, list)) },
  togglePlaying: (playing) => { dispatch(togglePlaying(playing)) },
  updateVolume: (newVolume) => { dispatch(updateVolume(newVolume)) },
})

export default connect(stateToProps, dispatchToProps)(ControlsImpl);
