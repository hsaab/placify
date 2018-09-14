import React from 'react';
import { StyleSheet, Text, View, SectionList, Image } from 'react-native';
import { connect } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as actions from "../../redux/actions/index.js";
import _ from 'lodash';
import ListItem from "../../components/ListItem.js";

class AddPlacetoList extends React.Component {
  // See ListMaster for detail on sorting functions
  static navigationOptions = {
    title: 'Add Place to List',
    headerTitleStyle: {
      fontSize: wp('6'),
      color: '#333333',
      fontWeight: '500',
      fontFamily: 'AppleSDGothicNeo-Bold'
    },
  };

  sortList(list) {
    const sortedList = _.groupBy(list, (each) => ( each.name[0] ));
    const dataList = _.map(sortedList, (value, index) => {
      let key = { key: index };
      let data = { data: value };
      return Object.assign({}, key, data);
    })
    return _.orderBy(dataList, ['key'], ['asc']);
  }

  renderList() {
    const props = {...this.props}
    if(this.props.list.count > 0) {
      const dataList = this.sortList(this.props.list.types);
      return (
        <View style={styles.listContainer}>
          <SectionList
            keyExtractor={(item, index) => (index.toString())}
            renderItem={({ item }) =>
              <ListItem
                item={item}
                add={true}
                {...this.props}
                /> }
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
          <Text style={styles.text}>...navigate to List tab to create a list!</Text>
          <Image style={styles.downArrow} source={require('../../assets/downArrow.png')}/>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderList() }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list,
    search: state.search
  };
};

const mapDispatchToProps = {
  resolveNewPlace: actions.resolveNewPlace.bind(this)
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlacetoList);

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
    textAlign: 'center',
    color: '#333333',
    fontSize: wp(4.5),
    paddingTop: hp(3),
    lineHeight: hp(3.5),
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  listCount: {
    color: '#333333',
    fontWeight: '600',
    marginTop: hp(2),
    marginBottom: hp(2),
    fontSize: wp(5.5)
  },
  downArrow: {
    height: hp('60%'),
    resizeMode: 'contain',
    position: 'relative',
    opacity: 0.3
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
    backgroundColor: '#595959',
  },
});
