import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from './Content'
import States from './States'
import Footer from './Footer'
import { fetchCurrentTrack } from '../actions/tracksActions'
import '../styles/App.css'

class App extends Component {
  /**
   * When the component will mount, fetch the tracks of the playlist
   */
  constructor(props) {    
    super(props);
    props.fetchCurrentTrack()
  }

  render() {
    return (
      <div className="app">
        <States />
        <Content />
        <Footer />
      </div>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = (dispatch) => ({
  fetchCurrentTrack: () => dispatch(fetchCurrentTrack()),
})

export default connect(stateToProps, dispatchToProps)(App)
