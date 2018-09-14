import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as helpers from "../utils/helpers.js";

export default class MapLocation extends Component {
  render() {
    const { start } = this.props;
    const { end } = this.props;
    end.latitude = end.lat;
    end.longitude = end.lng;

    //Add helper function to calculate an approx lat and lng delta
    const coords = helpers.getCoords([start, end]);
    coords.latitudeDelta *= 2.5; // Increase by multiplier to fit both markers comfortably
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={coords}>
          <MapView.Marker
             coordinate={{
               latitude: end.lat,
               longitude: end.lng
             }}
             pinColor={'#008000'}
             />
           <MapView.Marker
             coordinate={{
               latitude: start.latitude,
               longitude: start.longitude
             }}
             />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    width: wp('100%'),
    marginTop: hp(1),
  },
  map: {
    width: wp('100%'),
    height: hp(37)
  }
});
