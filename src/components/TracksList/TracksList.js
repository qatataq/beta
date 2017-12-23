import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import classnames from 'classnames'
import FlipMove from 'react-flip-move';
import { fetchCurrentTrack } from '../../actions/tracksActions'

import noCover from '../../images/notrack.jpg'

import '../../styles/TrackList.css'
 
class TracksList extends Component {

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
    console.log("INFOS", dateEnd.format(), now.format(), dateEnd.diff(now));
    fetchCurrentTrack();
  }

  getTracklist() { 
    const { tracks } = this.props
    if (tracks.list.length !== 0) {
     return tracks.list.map((d, i) => (
      <img
        className={classnames('TrackList-item', {
          'last': i === tracks.list.length - 1,
        })}
        key={i}
        src={d.cover ? d.cover : noCover}
        role="track"
      />))
    }
    return null;
  }

  render() {
    return (
      <FlipMove
        className="TrackList is-fadeIn"
        duration={300}
        easing="ease-in-out"
        maintainContainerHeight
      >
        {this.getTracklist()}
      </FlipMove>
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
