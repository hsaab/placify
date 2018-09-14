import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class ResultPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { distance: null };
    this.getDistance = this.props.getDistance.bind(this);
  }

  componentDidMount() {
    //Upon component mounting get distance between users location and prediction in real-time
    const { user } = this.props;
    const { item } = this.props;
    !this.isCancelled && this.getDistance(item.place_id, user.coords);
  }

  componentWillUnmount() {
    //Upon component unmounting make sure no more async functions are running
    this.isCancelled = true;
  }

  render() {
    const { item } = this.props;
    const title = item.structured_formatting.main_text;
    const place_id = item.place_id;
    const { navigation } = this.props;
    const distance = this.state.distance;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.push("PlaceProfile", { place_id, title, distance })}>
        /* Send data to profile page to store in Redux */
        <Text style={styles.desc}>{item.description.slice(0,32) + "..."}</Text>
        <Text style={styles.dist}>{distance}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp(2),
    borderBottomColor: 'silver',
    borderBottomWidth: 0.5,
    height: hp(9),
    borderStyle: 'solid'
  },
  searchInput: {
    width: wp('95%'),
    marginTop: hp(1),
  },
  desc: {
    width: wp('65%'),
    color: '#333333',
    fontSize: wp(3.85)
  },
  dist: {
    width: wp('20%'),
    textAlign: 'right',
    color: 'gray',
    fontSize: wp(3.85)
  }
});
