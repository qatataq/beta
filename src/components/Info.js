import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/Info.css'

class Info extends Component {

   /**
    * Return the track link to Soundcloud
    */
   getTrackLink = () => {
     const { player } = this.props
     const link = player.track.permalink_url || '#'

     return link.substr(0, link.indexOf('s-suaqL'))
   }

  render() {
    const { player } = this.props
    return (
      <div className="is-fadeIn">
        {player.track ?
          <div className="info">
            <div className="track-title">
              <a href={this.getTrackLink()} target="_blank">{player.track.title}</a>
            </div>
            <div className="track-artist">{player.track.user.username}</div>
            <div className="track-label">{player.track.label_name}</div>
          </div>
        :
          null
        }
      </div>
    )
  }
}

const stateToProps = (state) => ({
  player: state.player,
})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(Info);
