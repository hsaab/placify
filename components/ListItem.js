import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from "react-navigation";

class ListItem extends React.Component {
  // Re-using this component to view list names (see ListView)
  // OR add new places to lists (see AddPlacetoList)
  render() {
    const { item } = this.props;
    const { add } = this.props;

    // If we are adding new places to lists, then we want to send a payload
    // to be able to add the place to a list in Redux
    // If not, we just want to be able to see the number of places a list has
    if(add) {
      let profile = this.props.search.profile;
      let pic = this.props.search.pic;
      let payload = { profile, pic, listId: item.id };
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
              this.props.resolveNewPlace(payload, item.id)
              this.props.navigation.navigate("ListMaster")
            }} >
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Image style={styles.plus} source={require("../assets/plus.png")}/>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.push("ListView", { listView: item.name + " List", listId: item.id })}
          style={styles.container}
          >
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.count}>
              { item.count > 1 || item.count === 0 ?
                item.count + " places" : item.count + " place" }
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
}

export default withNavigation(ListItem);

const styles = StyleSheet.create({
  container: {
    height: hp(7),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderColor: '#ACACAC',
    width: wp('100%'),
    borderBottomWidth: 0.5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('75%'),
    marginLeft: wp(5.5),
    justifyContent: 'space-between'
  },
  name: {
    color: '#333333',
    fontSize: wp(4.75),
    textAlign: 'left',
    left: wp(7),
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  count: {
    color: 'gray',
    fontSize: wp(4.25),
    textAlign: 'left',
    left: wp(7),
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  plus: {
    resizeMode: 'contain',
    width: wp('4.5%'),
    opacity: 0.75,
    left: wp(7)
  }
});
