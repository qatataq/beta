import React, { Component } from 'react'
import { connect } from 'react-redux'
import Velocity from 'velocity-animate'
import _ from 'lodash'
import {
  togglePlaying,
  updateVolume,
} from '../../actions/playerActions'
import {
  PlayPause,
  Sound,
} from '../Icons'
import '../../styles/Controls.css'

class Audio extends Component {

  audio = null
  isStartingMobile = navigator.userAgent
    .toLowerCase()
    .includes('mobi')

  componentDidMount() {
    const { togglePlaying } = this.props
    // If on mobile device manually set the audio as paused

    if (this.isStartingMobile) {
      togglePlaying(true)
    } else {
      window.addEventListener('keydown', _.debounce(this.resolveKeydown, 300))
    }
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props
    if (this.isStartingMobile) {
      return
    }
    if (prevProps.player.index !== player.index && this.audio) {
      this.audio.pause()
      this.audio.load()
      this.audio.play()
    }
    if (prevProps.player.playing !== player.playing && this.audio) {
      player.playing ? this.audio.play() : this.audio.pause()
    }
    if (prevProps.player.volume !== player.volume && this.audio) {
      this.audio.volume = player.volume / 100
    }
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
    if (this.isStartingMobile) {
      this.audio.play()
      this.isStartingMobile = false
    }
    Velocity(element, animAttr, _.extend(animParams, onComplete))
  }


  /**
   * Do actions when shortcuts are pressed :
   * - "space" togglePlay
   * - "m" toggleMute
   * - "n", "arrow key right" nextTrack
   */
  resolveKeydown = (event) => {
    const { togglePlaying, player, updateVolume } = this.props
    event.preventDefault()
    switch (event.keyCode) {
      case 32: // space
        togglePlaying(player.playing)
        break
      case 77: // m
        if (player.volume) {
          updateVolume(0)
        } else {
          updateVolume(player.prevVolume)
        }
        break
      case 78: // n
      case 80: // p
      default:
    }
  }

  render() {
    const { player, updateVolume } = this.props
    return (
      <div className="Controls is-fadeIn">
        <PlayPause
          className="controls-play"
          isPlaying={player.playing}
          onClick={this.handlePlayPause}
        />
        <Sound
          className={'controls-sound'}
          volume={player.volume}
          onChange={(event) => { updateVolume(event.target.value) }}
        />
        <audio
          ref={audio => this.audio = audio}
          autoPlay
        >
          <source src="http://listen.radioking.com/radio/117904/stream/157294"/>
        </audio>
      </div>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = (dispatch) => ({
  togglePlaying: (playing) => { dispatch(togglePlaying(playing)) },
  updateVolume: (newVolume) => { dispatch(updateVolume(newVolume)) },
})

export default connect(stateToProps, dispatchToProps)(Audio);
