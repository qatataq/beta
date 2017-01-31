import React, { Component, PropTypes } from 'react'
import Velocity from 'velocity-animate'
import _ from 'lodash'

import Timer from './Timer'
import { Play, Mute } from './Icons'
import '../styles/Player.css'

class Player extends Component {
  static propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    playlistToken: PropTypes.string.isRequired
  }

  /**
   * Init the state waiting for the tracks, and indicating the starting index
   */
  audio = {}
  isSwitchingTrack = false
  muteButton = {}
  player = {}
  state = {
    index: 0,
  }

  /**
   * Define autoplay and shortcuts behavior regarding the product environment
   */
  componentDidMount() {
    // If on mobile device manually set the audio as paused
    const isMobile = navigator.userAgent
      .toLowerCase()
      .includes('mobi')
    this.audio.paused = isMobile
    // If not on mobile listen for shortcuts
    if(!isMobile) {
      window.addEventListener('keydown', _.debounce(this.resolveKeydown, 300))
    }
  }

  /**
   * The first time the player receive props containing tracks
   * trigger the player appearing
   */
  componentWillReceiveProps(nextProps) {
    const { tracks } = this.props
    // if(tracks.length === 0 && nextProps.tracks.length !== 0) {
    //   this.setPlayerAppearance()
    // }
    if(!tracks.length && nextProps.tracks.length) {
      this.setPlayerAppearance()
    }
  }

  /**
   * Animate the player :
   * - opacity from 0 to 1
   * - position top from 21% to 18% or 0 (depending on the window width)
   */
  setPlayerAppearance = () => {
    const properties = {
      top: [window.innerWidth > 768 ? '18%' : '0px', '21%'],
      opacity: [1, 0],
    }
    const parameters = {
      duration: [1000, 0],
      easing: [.58, 1.6, .57, .87],
      delay: [1000, 0],
    }
    Velocity(this.player, properties, parameters)
      .then(() => {this.player.style.top = ''})
  }

  /**
   * When the track is loaded start fading the volume
   */
  loadedTrack = () => {
    this.audio.volume = 0
    this.fadeInVolume()
  }

  /**
   * While the sound is inferior to 1 (100%) keep incrementing it towards 1
   */
  fadeInVolume = () => {
    if(this.audio.volume < 1) {
      this.audio.volume = (this.audio.volume + .01).toFixed(2)
      setTimeout(this.fadeInVolume, 10)
    }
  }

  /**
   * Toggle the play/pause state of the player
   */
  togglePlay = () => {
    this.audio.paused ? this.audio.play() : this.audio.pause()
    this.forceUpdate() // force update to rerender the play/pause button
  }

  /**
   * Toggle the volume of the audio player
   */
  toggleMute = () => {
    const cross = this.muteButton.querySelector("#cross")
    const sound = this.muteButton.querySelector("#sound")
    const properties = (direction = false) => ({
      translateX: direction ? '0px' : '-30px',
    })
    const parameters = (direction = false) => ({
      duration: 300,
      easing: [.58,1.6,.57,.87],
      delay: direction ? 200 : 0,
    })
    this.audio.volume = this.audio.volume ? 0 : 1
    Velocity(cross, 'stop', true)
    Velocity(sound, 'stop', true)
    Velocity(cross, properties(this.audio.volume), parameters(this.audio.volume))
    Velocity(sound, properties(!this.audio.volume), parameters(!this.audio.volume))
    this.forceUpdate() // force update to rerender the mute button
  }

  /**
   * Change the current track to the next one from the playlist
   */
  nextTrack = (event) => {
    const { index } = this.state
    const { tracks } = this.props
    const element = event.currentTarget
    const animParams = { duration:200, easing: [.13,1.67,.72,2] }
    this.isSwitchingTrack = true
    this.setState({ index: (index + 1) % tracks.length })
    this.audio.pause()
    this.audio.load()
    this.audio.play()
    Velocity(element, { translateX: '8px' }, animParams)
    Velocity(element, 'reverse', animParams)
        .then(() => {
          Velocity(element, 'stop', true)
          this.isSwitchingTrack = false
        })
  }

  /**
   * Return the track link to Soundcloud
   */
  getTrackLink = () => {
    const { index } = this.state
    const { tracks, playlistToken } = this.props
    const link = tracks[index].permalink_url || '#'

    return link.substr(0, link.indexOf(playlistToken))
  }

  /**
   * Do actions when shortcuts are pressed :
   * - "space" togglePlay
   * - "m" toggleMute
   * - "n", "arrow key right" nextTrack
   */
  resolveKeydown = (event) => {
    event.preventDefault()
    switch(event.keyCode) {
      case 32: // space
        this.togglePlay()
        break
      case 77: // m
        this.toggleMute()
        break
      case 78: // n
      case 39: // right-arrow
        this.nextTrack({ currentTarget: this.audio }) // simulate event.currentTarget
        break
      default:
    }
  }

  render() {
    const { index } = this.state
    const { tracks } = this.props

    return (
      <div
        className="player"
        ref={player => this.player = player}
      >
        <div className="player-shadow"></div>
        <div className="player-background"></div>
        <div className="player-content">
          <div className="player-column">
            <div className="track-pic">
              {tracks.length && (
                <img
                  src={tracks[index].artwork_url.replace('large', 't500x500')}
                  alt="track artwork"
                />
              )}
            </div>
            <div className="track-buttons">
              <Play
                onClick={this.togglePlay}
                isPlayed={!this.audio.paused}
                className="track-play-button"
              />
              <Mute
                reference={mute => this.muteButton = mute}
                onClick={this.toggleMute}
                isMuted={this.audio.volume === 0}
                className="track-pause-button"
              />
            </div>
          </div>
          <div className="player-column player-column-light">
            <div className="track-title">
              {tracks.length && (
                <a href={this.getTrackLink()} target="_blank">{tracks[index].title}</a>
              )}
            </div>
            <div className="track-artist">{tracks.length && tracks[index].user.username}</div>
            <div className="track-label">{tracks.length && tracks[index].label_name}</div>
            {tracks.length && (
              <Timer
                duration={tracks[index].duration}
                isPlayed={!this.audio.paused}
                isSwitchingTrack={this.isSwitchingTrack}
              />
            )}
            <div className="track-skip" onClick={this.nextTrack}>
              skip this track
            </div>
          </div>
          {tracks.length && (
            <audio
              ref={audio => this.audio = audio}
              autoPlay
              onLoadedData={index === 0 && (this.loadedTrack)}
              onEnded={this.nextTrack}
            >
              <source src={tracks[index].stream_url}/>
            </audio>
          )}
        </div>
      </div>
    )
  }
}

export default Player
