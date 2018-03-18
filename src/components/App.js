import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from './Content'
import Header from './Header'
import States from './States'
import { fetchHistory, fetchCurrentTrack } from '../actions/tracksActions'
import '../styles/App.css'

class App extends Component {
  /**
   * When the component will mount, fetch the tracks of the playlist
   */
  constructor(props) {
    super(props);
    props.fetchHistory();
    props.fetchCurrentTrack();
  }

  render() {
    return (
      <div className="app">
        <States />
        <Header />
        <Content />
      </div>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = (dispatch) => ({
  fetchHistory: () => dispatch(fetchHistory()),
  fetchCurrentTrack: () => dispatch(fetchCurrentTrack())
})

export default connect(stateToProps, dispatchToProps)(App)
