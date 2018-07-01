import React, { Component } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import Velocity from 'velocity-animate'
import { debounce, extend } from 'lodash'
import { togglePlaying, updateVolume } from '../../actions/playerActions'
import { PlayPause, Volume } from '../Icons'
import '../../styles/Controls.css'

const STREAM_URL = 'https://listen.radioking.com/radio/117904/stream/157294'

class Audio extends Component {
  audio = null
  isStartingMobile = navigator.userAgent.toLowerCase().includes('mobi')

  constructor(props) {
    super(props)
    this.state = {
      playingStatus: Sound.status.PLAYING,
      volume: 100,
      stream: STREAM_URL,
    }
  }

  componentDidMount() {}

  handlePlayPause = event => {
    const { player, togglePlaying } = this.props
    const { playingStatus } = this.state

    const newPlayerState =
      playingStatus === Sound.status.PLAYING
        ? Sound.status.PAUSED
        : Sound.status.PLAYING
    console.log(newPlayerState)
    this.setState({
      playingStatus: newPlayerState,
      stream: playingStatus === Sound.status.PLAYING ? '' : STREAM_URL,
    })
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
    const { volume, playingStatus, stream } = this.state
    return (
      <div className="Controls is-fadeIn">
        <PlayPause
          className="controls-play"
          isPlaying={player.playing}
          onClick={this.handlePlayPause}
        />
        <Volume
          className={'controls-sound'}
          volume={volume}
          onChange={event => {
            this.setState({ volume: event.target.value })
          }}
        />
        <Sound
          url={stream}
          autoPlay
          playStatus={playingStatus}
          volume={volume}
        />
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
