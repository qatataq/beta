export const loadTrack = (index, list) => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_TRACK',
      payload: list[index],
    })
  }
}

export const nextTrack = (index, list) => {
  return (dispatch) => {
    const nextIndex = (index + 1) % list.length
    dispatch({
      type: 'NEXT_INDEX',
      payload: nextIndex,
    })
  }
}

export const previousTrack = (index, list) => {
  return (dispatch) => {
    const previousIndex = index ? (index - 1) : (list.length - 1)
    dispatch({
      type: 'NEXT_INDEX',
      payload: previousIndex,
    })
  }
}

export const togglePlaying = (playing) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_PLAYING',
      payload: !playing,
    })
  }
}

export const updateVolume = (newVolume) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_VOLUME',
      payload: newVolume,
    })
  }
}
