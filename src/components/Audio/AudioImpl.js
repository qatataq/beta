import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  loadTrack,
  nextTrack,
  previousTrack,
  togglePlaying,
  updateVolume,
} from '../../actions/playerActions'

class AudioImpl extends Component {

  audio = null

  componentDidMount() {
    const { togglePlaying } = this.props
    // If on mobile device manually set the audio as paused
    const isMobile = navigator.userAgent
      .toLowerCase()
      .includes('mobi')
    if (isMobile) {
      togglePlaying(true)
    } else {
      window.addEventListener('keydown', _.debounce(this.resolveKeydown, 300))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loadTrack, player, tracks } = this.props

    const isFirstTrack = nextProps.tracks.list.length && !nextProps.player.track && !player.track
    const isNewTrack = nextProps.player.index !== player.index
    if (isFirstTrack || isNewTrack) {
      loadTrack(nextProps.player.index, tracks.list)
    }
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props
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

  /**
   * Do actions when shortcuts are pressed :
   * - "space" togglePlay
   * - "m" toggleMute
   * - "n", "arrow key right" nextTrack
   */
  resolveKeydown = (event) => {
    const { nextTrack, togglePlaying, player, previousTrack, tracks, updateVolume } = this.props
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
      case 39: // right-arrow
        nextTrack(player.index, tracks.list)
        break
      case 80: // p
      case 37: // left-arrow
        previousTrack(player.index, tracks.list)
        break
      default:
    }
  }

  render() {
    const { nextTrack, player, tracks } = this.props
    return (
      <div>
        {player.track && (
          <audio
            ref={audio => this.audio = audio}
            autoPlay
            onEnded={() => { nextTrack(player.index, tracks.list) }}
          >
            <source src={player.track.stream_url}/>
          </audio>
        )}
      </div>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = (dispatch) => ({
  loadTrack: (index, list) => { dispatch(loadTrack(index, list)) },
  nextTrack: (index, list) => { dispatch(nextTrack(index, list)) },
  previousTrack: (index, list) => { dispatch(previousTrack(index, list)) },
  togglePlaying: (playing) => { dispatch(togglePlaying(playing)) },
  updateVolume: (newVolume) => { dispatch(updateVolume(newVolume)) },
})

export default connect(stateToProps, dispatchToProps)(AudioImpl);
