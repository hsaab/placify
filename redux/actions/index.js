import * as API from "../../API/gPlaces.js"

function addUserLocation(payload) {
  return {
    type: "ADDUSERLOCATION",
    payload
  };
}

function addList(list) {
  return {
    type: "ADDNEWLIST",
    list
  }
}

function viewPlace(profile, pic) {
  return {
    type: "VIEWPLACE",
    profile,
    pic
  }
}

// ALL ASYNC actions using THUNK

// Get profile, including image
function resolveProfile(place_id, title, distance) {
  return (dispatch) => {
    //Get profile from API route
    return API.getDetails(place_id).then(
      result => result.data.result
    )
    .then((profile) => {
      profile.photos ? profile.photos = profile.photos.slice(0,1) : null;
      profile.title = title;
      profile.distance = distance;
      dispatch({ type: "ADDPROFILE", profile });

      if(profile.photos) {
        // If the profile has pictures, then send an API request to pull the picture
        return API.getImage(profile.photos[0].photo_reference).then(
          data => data.request.responseURL
        )
        .then((pic) => {
          dispatch({ type: "ADDPIC", pic });
        })
      } else {
        dispatch({ type: "ADDPIC", pic: null });
      }
    })
  };
}

function resolveNewPlace(payload, listId) {
  return (dispatch) => {
    dispatch({ type: "ADDNEWPLACE", payload});
    dispatch({ type: "ADDPLACETOLIST", listId});
    return;
  }
}


export {
  addUserLocation,
  addList,
  resolveProfile,
  resolveNewPlace,
  viewPlace
};
