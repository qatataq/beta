import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import classnames from 'classnames'
import FlipMove from 'react-flip-move';
import Info from './../Info'
import { fetchCurrentTrack } from '../../actions/tracksActions'

import noCover from '../../images/notrack.jpg'

import '../../styles/TrackList.css'
 
class TracksList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trackFocused: {}
    }
  }
  componentDidMount() {
  this.updateDisplay();
   var intervalId = setInterval(this.updateDisplay.bind(this), 5000);
   // store intervalId in the state so it can be accessed later:
   this.setState({intervalId: intervalId});
  }


  componentwillMount() {
  this.updateDisplay();
   var intervalId = setInterval(this.updateDisplay.bind(this), 5000);
   // store intervalId in the state so it can be accessed later:
   this.setState({intervalId: intervalId});
  }

  updateDisplay() {
    const { tracks, fetchCurrentTrack } = this.props;
    if (!_.head(tracks.list)) {
      return;
    }

    const dateEnd = new moment(tracks.list[0].end_at);
    const now = new moment();
    fetchCurrentTrack();
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
    const { tracks } = this.props
    if (tracks.list.length !== 0) {
     return tracks.list.map((d, i) => (
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
        <FlipMove
          className="TrackList is-fadeIn"
          duration={300}
          easing="ease-in-out"
          maintainContainerHeight
        >
          {this.getTracklist()}
        </FlipMove>
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

const stateToProps = ({tracks}) => ({
  tracks: tracks
})

const dispatchToProps = (dispatch) => ({
  fetchCurrentTrack: () => dispatch(fetchCurrentTrack()),
})

export default connect(stateToProps, dispatchToProps)(TracksList);
