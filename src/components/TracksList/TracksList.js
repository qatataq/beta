import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import classnames from 'classnames'
import Info from './../Info'
import { fetchCurrentTrack } from '../../actions/tracksActions'

import noCover from '../../images/notrack.jpg'

import '../../styles/TrackList.css'

class TracksList extends Component {
  interval1 = null
  interval2 = null

  state = {
    trackFocused: null,
    currentTrack: 0,
    tracks: [],
    nextTrackReady: false
  }

  componentDidMount() {
    this.interval1 = setInterval(this.isCurrentTrackFinished, 5000);
    this.interval2 = setInterval(this.isNextTrackReady, 5000);
  }

  componentWillReceiveProps(nextProps) {
    const { tracks, isNextTrackReady } = nextProps;
    const { currentTrack } = this.state;
    this.setState({
      tracks: tracks.list.slice(currentTrack)
    })
    if (isNextTrackReady) {
      this.setState({
        nextTrackReady: true
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval1)
    clearInterval(this.interval2)
  }

  isCurrentTrackFinished = () => {
    const { tracks, currentTrack, nextTrackReady } = this.state;
    if (tracks[currentTrack].end_at) {
      const isTrackFinished = moment().isAfter(moment(tracks[currentTrack].end_at).add(30, 'seconds'));
      if (isTrackFinished && nextTrackReady) {
        this.setState({
          nextTrackReady: false
        })
      }
    }
  }

  isNextTrackReady = () => {
    const { tracks, currentTrack, nextTrackReady } = this.state;

    if (tracks[currentTrack].end_at) {
      const isTrackAlmostFinished = moment().isAfter(moment(tracks[currentTrack].end_at).add(20, 'seconds'));
      if (isTrackAlmostFinished && !nextTrackReady) {
        this.props.fetchCurrentTrack();
      }
    }
  }

  onMouseOver = (track) => {
    this.setState({
      trackFocused: track
    });
  }

  onMouseOut = () => {
    this.setState({
      trackFocused: null
    });
  }

  getTracklist = () => {
    const { tracks } = this.state;

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
      />))
    }
    return null;
  }

  render() {
    return (
      <div className="Tracklist-container">
        <div className="TrackList">
          {this.getTracklist()}
        </div>
        <div className="Tracklist-infos">
          <Info
            {...this.props}
            trackFocused={this.state.trackFocused}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TracksList);
