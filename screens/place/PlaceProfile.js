import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import * as gp from "../../API/gPlaces.js";
import * as actions from "../../redux/actions/index.js";
import MapLocation from "../../components/MapLocation.js";

class PlaceProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      distance: null,
      error: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    // Grab title from react navigation state for profile
    return {
      title: navigation.getParam('title', 'Placify'),
      headerTitleStyle: {
        fontSize: wp('6'),
        color: '#333333',
        fontWeight: '500',
        fontFamily: 'AppleSDGothicNeo-Bold'
      }
    };
  };

  componentDidMount() {
    // Grab place_id and distance from react navigation state for profile
    const place_id = this.props.navigation.getParam('place_id', false);
    const title = this.props.navigation.getParam('title', null);
    const distance = this.props.navigation.getParam('distance', null);
    this.setState({ distance });

    // Dispatch function to grab place profile from API, using Thunk to handle async
    this.props.resolveProfile(place_id, title, distance);
  }

  render() {
    const { pic } = this.props.search;
    const { profile } = this.props.search;
    const { newProfile } = this.props.search;
    const { user } = this.props;

    // If our API as retrieved the profile, then render the profile
    // If not don't render anything and if error, render error message
    if(profile) {
      return (
        <View style={styles.container}>
          { pic ?
          <Image style={styles.profpic} source={{uri: pic}} /> :
          <Image style={styles.profpic} source={require("../../assets/generic.jpg")} /> }
          <View style={styles.detailContainer}>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require("../../assets/establishment.png")}/>
              <Text style={styles.detail}>{profile.types[0][0].toUpperCase() + profile.types[0].slice(1)}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require("../../assets/phone.png")}/>
              <Text style={styles.detail}>{profile.formatted_phone_number}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require("../../assets/marker.png")}/>
              <Text style={styles.detail}>{this.state.distance ? this.state.distance : profile.distance} away</Text>
            </View>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{profile.formatted_address.slice(0,45)}</Text>
          </View>
          <MapLocation start={user.coords} end={profile.geometry.location} />
          { newProfile ?
          <View style={styles.btnContainer}>
            <Button
              title="Add to List"
              buttonStyle={styles.newPlaceBtn}
              onPress={() => this.props.navigation.push('AddPlacetoList')}
              />
          </View> :
          <View style={styles.btnContainer}>
            <Button
              title="Go Here"
              buttonStyle={styles.newPlaceBtn}
              onPress={() => Alert.alert('Under construction!')}
              />
          </View> }
        </View>
        );
      } else if(this.state.error) {
        return (
          <View>
            <Text style={styles.text}>-- There was an error connecting to the Google API. Please try again later --</Text>
          </View>
        )
      } else {
        return (
          null
        )
      }
    }
  }

const mapStateToProps = state => {
  return {
    user: state.user,
    search: state.search
  };
};

const mapDispatchToProps = {
    resolveProfile: actions.resolveProfile.bind(this)
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#e5e5e5',
  },
  detailContainer: {
    marginTop: hp(5),
    paddingLeft: wp(10),
    paddingRight: wp(10),
    height: hp(21)
  },
  detail: {
    fontSize: wp(4.75),
    color: '#333333',
    lineHeight: hp(7),
    fontWeight: '500',
    marginLeft: wp(4),
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  addressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    width: wp('100%'),
    marginTop: hp(5.25)
  },
  btnContainer: {
    alignItems: 'center',
    display: 'flex',
    width: wp('100%'),
    marginTop: hp(1)
  },
  address: {
    color: '#333333',
    fontWeight: '400',
    fontWeight: '500',
    width: wp('90%'),
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  newPlaceBtn: {
    width: wp('90%'),
    backgroundColor: 'rgb(0,122,255)',
  },
  profpic: {
    width: wp('100%'),
    height: hp('30%'),
    position: 'absolute',
    opacity: 0.25
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    fontSize: wp(4.5),
    padding: hp(4),
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    width: wp(6),
    height: hp(6),
    resizeMode: 'contain',
    opacity: 0.6
  }
});
