import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from "react-navigation";

class PlaceItem extends React.Component {
  render() {
    const { profile } = this.props.item;
    const { pic } = this.props.item;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.viewPlace(profile, pic);
          this.props.navigation.navigate("PlaceProfile", { title: profile.title });
          /* Navigate to one pager profiles for each place we have in a list */
        }}
        >
        <View style={styles.rowContainer}>
          { pic ?
          <Image style={styles.pic} source={{uri: pic}} /> :
          <Image style={styles.pic} source={require("../assets/generic.jpg")} /> }
          <View style={styles.detailContainer}>
            <Text style={styles.name}>{profile.title}</Text>
            <Text style={styles.detail}>{profile.types[0][0].toUpperCase() + profile.types[0].slice(1)}</Text>
            <Text style={styles.detail}>{profile.formatted_address.slice(0,36) + "..."}</Text>
            <Text style={styles.detail}>~{profile.distance} away</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(PlaceItem);

const styles = StyleSheet.create({
  container: {
    height: hp(13),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderColor: '#ACACAC',
    width: wp('100%'),
    borderBottomWidth: 0.5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('100%'),
    justifyContent: 'flex-start',
  },
  detailContainer: {
    marginLeft: wp(7),
    paddingRight: wp(5),
    display: 'flex'
  },
  name: {
    color: '#333333',
    fontSize: wp(4.75),
    fontFamily: 'AppleSDGothicNeo-Medium',
    marginBottom: hp(0.3)
  },
  detail: {
    fontSize: wp(4),
    color: '#5b5858',
    lineHeight: hp(2.4),
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  pic: {
    width: wp('15%'),
    height: hp('15%'),
    opacity: 0.8,
    resizeMode: 'contain',
    marginLeft: wp(4),
  }
});
