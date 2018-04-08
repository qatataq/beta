import React, { Component } from 'react'
import { connect } from 'react-redux'
import Velocity from 'velocity-animate'
import { debounce, extend } from 'lodash'
import { togglePlaying, updateVolume } from '../../actions/playerActions'
import { PlayPause, Sound } from '../Icons'
import '../../styles/Controls.css'

const STREAM_URL = 'https://listen.radioking.com/radio/117904/stream/157294'

class Audio extends Component {
  audio = null
  isStartingMobile = navigator.userAgent.toLowerCase().includes('mobi')

  componentDidMount() {
    const { togglePlaying } = this.props

    // If on mobile device manually set the audio as paused
    if (this.isStartingMobile) {
      togglePlaying(true)
    } else {
      window.addEventListener('keydown', debounce(this.resolveKeydown, 300))
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
      if (player.playing) {
        this.audio.play()
      } else {
        this.audio.src = STREAM_URL
        this.audio.pause()
      }
    }
    if (prevProps.player.volume !== player.volume && this.audio) {
      this.audio.volume = player.volume / 100
    }
  }

  handlePlayPause = event => {
    const { player, togglePlaying } = this.props
    const element = event.currentTarget
    const animAttr = { scaleX: '0.3', scaleY: '0.3', opacity: '0' }
    const animParams = { duration: 200, easing: [0.13, 1.67, 0.72, 2] }
    const onComplete = {
      complete: () => {
        togglePlaying(player.playing)
        Velocity(element, 'reverse', animParams).then(() => {
          Velocity(element, 'stop', true)
        })
      },
    }
    if (this.isStartingMobile) {
      this.audio.play()
      this.isStartingMobile = false
    }
    Velocity(element, animAttr, extend(animParams, onComplete))
  }

  /**
   * Do actions when shortcuts are pressed :
   * - "space" togglePlay
   * - "m" toggleMute
   * - "n", "arrow key right" nextTrack
   */
  resolveKeydown = event => {
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
          onChange={event => {
            updateVolume(event.target.value)
          }}
        />
        <audio ref={audio => (this.audio = audio)} src={STREAM_URL} autoPlay />
      </div>
    )
  }
}

const mapStateToProps = ({ player }) => ({ player })

const mapDispatchToProps = {
  togglePlaying,
  updateVolume,
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio)
