import React from 'react';
import { StyleSheet, Text, View, SectionList, Image } from 'react-native';
import { connect } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as actions from "../../redux/actions/index.js";
import _ from 'lodash';
import { Button } from 'react-native-elements';
import PlaceItem from "../../components/PlaceItem.js";
import { StackActions } from 'react-navigation';

class PlaceMaster extends React.Component {
  //See ListMaster for more function comments
  static navigationOptions = {
      title: "Places",
      headerTitleStyle: {
        fontSize: wp('6'),
        color: '#333333',
        fontWeight: '500',
        fontFamily: 'AppleSDGothicNeo-Bold'
      }
  };

  navigateToAdd() {
    //Navigate to add place upon click of button
    const pushAction = StackActions.push({ routeName: 'AddPlace' });
    return this.props.navigation.dispatch(pushAction);
  }

  sortList(list) {
    const sortedList = _.groupBy(list, (each) => ( each.profile.title[0] ));
    const dataList = _.map(sortedList, (value, index) => {
      let key = { key: index };
      let data = { data: value };
      return Object.assign({}, key, data);
    })
    return _.orderBy(dataList, ['key'], ['asc']);
  }

  renderList() {
    const { place } = this.props;
    if(place.length > 0) {
      const dataList = this.sortList(place);
      return (
        /* Pass down props to each child */
        <View style={styles.listContainer}>
          <SectionList
            keyExtractor={(item, index) => (index.toString())}
            renderItem={({ item }) =>
              <PlaceItem
                item={item}
                {...this.props}
                />}
            renderSectionHeader={({ section }) =>
              <View key={section.key} style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{section.key}</Text>
              </View> }
            sections={dataList}
          />
        </View>
      )
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text}>No places saved yet...</Text>
          <Text style={styles.text}>...click the button below!</Text>
        </View>
      )
    }
  }

  render() {
    const { list } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          { this.renderList() }
        </View>
        <View style={styles.btn}>
          <Button
            title="Add New Place"
            buttonStyle={styles.newPlaceBtn}
            onPress={() => this.navigateToAdd()}
            />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list,
    place: state.place
  };
};

const mapDispatchToProps = dispatch => {
  return {
    viewPlace: (profile, pic) => {
      dispatch(actions.viewPlace(profile, pic))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceMaster);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    padding: hp(3),
    fontSize: wp(5),
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  listCount: {
    color: '#333333',
    fontWeight: '600',
    marginTop: hp(2),
    marginBottom: hp(2),
    fontSize: wp(5.5)
  },
  listContainer: {
    width: wp('100%')
  },
  sectionHeader: {
    width: '100%',
    height: 15,
    justifyContent: 'space-around',
    backgroundColor: 'silver',
  },
  sectionText: {
    fontSize: wp(2.75),
    marginLeft: wp(4.5)
  },
  btnContainer: {
    alignItems: 'center',
    display: 'flex',
    width: wp('100%'),
    marginTop: hp(1)
  },
  newPlaceBtn: {
    width: wp('85%'),
    marginBottom: hp(3),
    backgroundColor: 'rgb(0,122,255)',
  },
});
