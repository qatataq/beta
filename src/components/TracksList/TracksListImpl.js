import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classnames from 'classnames'
import ImageLoader from 'react-imageloader';
import FlipMove from 'react-flip-move';

import '../../styles/TrackList.css'

class TracksListImpl extends Component {
  state = {
    loadingIndex: 0,
  }

  getTracksList = () => {
    const { player, tracks } = this.props
    const { loadingIndex } = this.state
    const sortedList = _.concat(tracks.list.slice(player.index, tracks.list.length), tracks.list.slice(0, player.index))
    return tracks.list.length ?
      sortedList.map((d, i) => (
        <ImageLoader
          className={classnames('suggestions-one', {
            'first': i === 0,
            'not-first': i !== 0,
          })}
          key={d.id}
          onLoad={() => this.setState({ loadingIndex: loadingIndex + 1 })}
          src={loadingIndex >= i ? d.artwork_url.replace('large', 't500x500') : ''}
          wrapper={React.DOM.div}
        />
      ))
    :
      []
  }
  render() {
    return (
        <FlipMove
          className="suggestions"
          duration={200}
          easing="cubic-bezier(0, 0.7, 0.8, 0.1)"
          maintainContainerHeight
        >
          {this.getTracksList()}
        </FlipMove>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(TracksListImpl);
