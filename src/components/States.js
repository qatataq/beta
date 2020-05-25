import React, { Component } from 'react'
import { connect } from 'react-redux'

import logo from '../images/logo.svg'
import error from '../images/error-qatataqfm.svg'

const Loader = () => (
  <div className="loader">
    <div className="loader-loading">
      <img src={logo} alt="qatataqfm logo" />
    </div>
  </div>
)

const Error = () => (
  <div className="error">
    <div className="error-display">
      <img src={error} alt="error illustration" />
    </div>
  </div>
)

export { Loader, Error }

class States extends Component {
  render() {
    const { tracks } = this.props

    if (tracks.loading) {
      return <Loader />
    }

    if (tracks.error) {
      return <Error />
    }

    return null
  }
}

const mapStateToProps = ({ tracks }) => ({ tracks })

export default connect(mapStateToProps)(States)
