import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from './Content'
import Header from './Header'
import States from './States'
import { fetchHistory, fetchCurrentTrack } from '../actions/tracksActions'
import '../styles/App.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchHistory()
    this.props.fetchCurrentTrack()
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

const mapStateToProps = null

const mapDispatchToProps = {
  fetchHistory,
  fetchCurrentTrack,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
