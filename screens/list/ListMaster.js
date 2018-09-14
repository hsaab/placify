import React from 'react';
import { StyleSheet, Text, View, SectionList, Image } from 'react-native';
import { connect } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as actions from "../../redux/actions/index.js";
import { Button } from 'react-native-elements';
import _ from 'lodash';
import ListItem from "../../components/ListItem.js";

class ListMaster extends React.Component {
  static navigationOptions = {
    title: 'Lists',
    headerTitleStyle: {
      fontSize: wp('6'),
      color: '#333333',
      fontWeight: '500',
      fontFamily: 'AppleSDGothicNeo-Bold'
    },
  };

  componentDidMount() {
    //Add current location of user upon first mounting
    const { user } = this.props;
    const { addUserLocation } = this.props;

    if(!user.coords.latitude || !user.coords.longitude) {
      navigator.geolocation.getCurrentPosition((position) => {
      addUserLocation(position.coords);
      }, (error) => { addUserLocation({ latitude: 37.33240730999999, longitude: -122.03046897999995 }) });
    }
}

  sortList(list) {
    //Create data structure that works with SectionList component
    const sortedList = _.groupBy(list, (each) => ( each.name[0] ));
    const dataList = _.map(sortedList, (value, index) => {
      let key = { key: index };
      let data = { data: value };
      return Object.assign({}, key, data);
    })
    return _.orderBy(dataList, ['key'], ['asc']);
  }

  renderList() {
    //If we have more than 0 lists, then we will want to render the SectionList
    const { list } = this.props;
    if(list.count > 0) {
      const dataList = this.sortList(list.types);
      return (
        <View style={styles.listContainer}>
          <SectionList
            keyExtractor={item => (item.id)}
            renderItem={({ item }) =>
              <ListItem
                item={item}
                add={false}
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
          <Text style={styles.text}>No lists saved yet...</Text>
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
          { this.renderList() } /* Render the SectionList here */
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Add New List"
            buttonStyle={styles.newPlaceBtn}
            onPress={() => this.props.navigation.push('ListAdd')}
            />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    list: state.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUserLocation: (payload) => {
      dispatch(actions.addUserLocation(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListMaster);

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
    marginLeft: wp(4.5),
    fontFamily: 'AppleSDGothicNeo-Medium',
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
