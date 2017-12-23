export const togglePlaying = playing =>
  dispatch =>
    dispatch({
      type: 'UPDATE_PLAYING',
      payload: !playing,
    })

export const updateVolume = newVolume => 
  dispatch =>
    dispatch({
      type: 'UPDATE_VOLUME',
      payload: newVolume,
    })
