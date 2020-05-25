import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Info from './../Info'
import { fetchCurrentTrack } from '../../actions/tracksActions'

import noCover from '../../images/notrack.jpg'

import '../../styles/TrackList.css'

const INTERVAL = 10000

class TracksList extends Component {
  interval1 = null

  state = {
    trackFocused: null,
    currentTrack: 0,
    tracks: [],
  }

  componentDidMount() {
    this.interval1 = setInterval(this.fetchNextTrack, INTERVAL)
  }

  componentWillReceiveProps(nextProps) {
    const { tracks } = nextProps
    const { currentTrack } = this.state
    this.setState({
      tracks: tracks.list.slice(currentTrack),
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval1)
  }

  fetchNextTrack = () => {
    this.props.fetchCurrentTrack()
  }

  onMouseOver = track => {
    this.setState({
      trackFocused: track,
    })
  }

  onMouseOut = () => {
    this.setState({
      trackFocused: null,
    })
  }

  getTracklist = () => {
    const { tracks } = this.state

    if (tracks.length !== 0) {
      return tracks.map((track, index) => (
        <img
          key={track.id}
          alt={track.title}
          className={classnames('TrackList-item', {
            last: index === 0,
          })}
          src={track.cover ? track.cover : noCover}
          onMouseOut={() => this.onMouseOut(track)}
          onMouseOver={() => this.onMouseOver(track)}
        />
      ))
    }
    return null
  }

  render() {
    return (
      <div className="Tracklist-container">
        <div className="TrackList">{this.getTracklist()}</div>
        <div className="Tracklist-infos">
          <Info {...this.props} trackFocused={this.state.trackFocused} />
        </div>
        <div />
      </div>
    )
  }
}

const mapStateToProps = ({ tracks, isNextTrackReady }) => ({
  tracks,
  isNextTrackReady,
})

const mapDispatchToProps = {
  fetchCurrentTrack,
}

export default connect(mapStateToProps, mapDispatchToProps)(TracksList)
