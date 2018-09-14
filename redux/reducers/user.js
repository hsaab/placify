let initialState = {
  coords: {
    latitude: null,
    longitude: null
  }
}

const user = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'ADDUSERLOCATION':
      newState.coords.latitude = action.payload.latitude;
      newState.coords.longitude = action.payload.longitude;
      return newState;
    default:
      return state
  }
}

export default user;
