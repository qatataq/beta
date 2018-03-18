import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import classnames from 'classnames'
import Info from './../Info'
import { fetchCurrentTrack } from '../../actions/tracksActions'

import noCover from '../../images/notrack.jpg'

import '../../styles/TrackList.css'

class TracksList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trackFocused: null,
      currentTrack: 0,
      tracks: [],
      interval1: null,
      interval2: null,
      nextTrackReady: false
    }
  }

  componentDidMount() {
    const interval1 = setInterval(this.isCurrentTrackFinished.bind(this), 5000);
    const interval2 = setInterval(this.isNextTrackReady.bind(this), 5000);
    this.setState({
      interval1,
      interval2
    });
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
      clearInterval(this.state.interval1) // stop memory leaks
      clearInterval(this.state.interval2) // stop memory leaks
  }

  isCurrentTrackFinished() {
    const { tracks, currentTrack, nextTrackReady } = this.state;
    if (tracks[currentTrack].end_at) {
      const isTrackFinished = moment().isAfter(moment(tracks[currentTrack].end_at).add(30, 'seconds'));
      //console.log("isTrackFinished", isTrackFinished, nextTrackReady, moment().format('HH:mm:ss'), moment(tracks[currentTrack].end_at).format('HH:mm:ss'));
      if (isTrackFinished && nextTrackReady) {
        this.setState({
          nextTrackReady: false
        })
      }
    }
  }

  isNextTrackReady() {
    const { tracks, currentTrack, nextTrackReady } = this.state;

    if (tracks[currentTrack].end_at) {
      const isTrackAlmostFinished = moment().isAfter(moment(tracks[currentTrack].end_at).add(20, 'seconds'));
      //console.log("isTrackReady", isTrackAlmostFinished, !nextTrackReady, moment().format('HH:mm:ss'), new moment(tracks[currentTrack].end_at).format('HH:mm:ss'));
      if (isTrackAlmostFinished && !nextTrackReady) {
        this.props.fetchCurrentTrack();
      }
    }
  }

  onMouseOver(track) {
    this.setState({
      trackFocused: track
    });
  }

  onMouseOut() {
    this.setState({
      trackFocused: null
    });
  }

  getTracklist() {
    const { tracks } = this.state;

    if (tracks.length !== 0) {
     return tracks.map((d, i) => (
      <img
        className={classnames('TrackList-item', {
          'last': i === 0,
        })}
        key={i}
        src={d.cover ? d.cover : noCover}
        role="track"
        onMouseOut={() => this.onMouseOut(d)}
        onMouseOver={() => this.onMouseOver(d)}
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

const stateToProps = ({ tracks, isNextTrackReady }) => ({
  tracks,
  isNextTrackReady,
})

const dispatchToProps = (dispatch) => ({
  fetchCurrentTrack: () => dispatch(fetchCurrentTrack()),
})

export default connect(stateToProps, dispatchToProps)(TracksList);
