import axios from "axios";
import { gPlaces_API_KEY } from 'react-native-dotenv';

const apiKey = gPlaces_API_KEY;

//Refresh prediction state, then send request to gather new predictions near user location from GMaps API as we input text
async function autocomplete(input, userLocation) {
  try {
    this.setState({ predictions: [] });
    const request = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=${userLocation.latitude},${userLocation.longitude}&key=${apiKey}`,
    }
    const result = await axios(request);
    const predictions = await result.data.predictions;
    this.setState({ predictions });
  } catch(e) {
    this.setState({ error: true });
    console.log("Unable to get autocomplete predictions.", e);
  }
}

//Get approx. distance from user location for each prediction of autocomplete
async function getDistance(prediction, userLocation) {
  try {
    this.setState({ distance: null });
    const request = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation.latitude},${userLocation.longitude}&destinations=place_id:${prediction}&key=${apiKey}`,
    }
    const result = await axios(request);
    const distance = await result.data.rows[0].elements[0].distance.text;
    !this.isCancelled && this.setState({ distance });
  } catch(e) {
    this.setState({ distance: 'Distance Unknown' });
    console.log("Unable to get distance for search previews.", e);
  }
}

//Get promise of profile to send over to redux actions, so we can resolve using thunk
function getDetails(place_id) {
  const fields = `formatted_address,formatted_phone_number,geometry,place_id,types,photos`;
  const request = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&fields=${fields}&key=${apiKey}`,
  }
  return axios(request);
}

//Get promise of image to send over to redux actions, so we can resolve using thunk
function getImage(photo_ref) {
  const request = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${apiKey}`,
  }
  return axios(request);
}

module.exports = { autocomplete, getDistance, getDetails, getImage };
