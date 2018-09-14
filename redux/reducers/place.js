let initialState = [];

const place = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case 'ADDNEWPLACE':
      let newState = state.slice();
      let newPlace = Object.assign({}, action.payload);
      newState.push(newPlace);
      return newState;
    default:
      return state
  }
}

export default place;
