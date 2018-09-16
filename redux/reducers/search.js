let initialState = {
  profile: null,
  pic: null,
  newProfile: true
}

const search = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'ADDPROFILE':
      newState.profile = action.profile;
      newState.newProfile = true;
      return newState;
    case 'ADDPIC':
      newState.pic = action.pic;
      newState.newProfile = true;
      return newState;
    case 'VIEWPLACE':
      newState.profile = action.profile;
      newState.pic = action.pic;
      newState.newProfile = false;
      return newState;
    case 'RESETPLACE':
      newState.profile = null;
      newState.pic = null;
      newState.newProfile = true;
      return newState;
    default:
      return state
  }
}

export default search;
