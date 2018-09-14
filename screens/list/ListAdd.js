import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as actions from "../../redux/actions/index.js";
import { SearchBar, Button } from 'react-native-elements';
import _ from "lodash";

class ListAdd extends React.Component {
  state = { name: '' }

  static navigationOptions = {
    title: 'Add List',
    headerTitleStyle: {
      fontSize: wp('6'),
      color: '#333333',
      fontWeight: '500',
      fontFamily: 'AppleSDGothicNeo-Bold'
    },
  };

  handleAdd() {
    //Error handling if list name too small OR already exists in our Redux store
    const { name } = this.state;
    if(name.length < 2) return Alert.alert('List name too small!');

    const exists = _.find(this.props.list.types, { 'name': name });
    if(exists) return Alert.alert('List name already exists! Pick another name.');

    this.props.addList(name);
    this.props.navigation.push('ListMaster');
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type here..."
          lightTheme
          noIcon
          containerStyle={styles.searchInput}
          inputStyle={styles.textInput}
          onChangeText={(name) => this.setState({ name })}
          />
        <View style={styles.btnContainer}>
          <Button
            title="Add This List"
            buttonStyle={styles.newPlaceBtn}
            onPress={() => this.handleAdd()}
            />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addList: (list) => {
      dispatch(actions.addList(list));
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(ListAdd);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchInput: {
    width: wp('90%'),
    marginTop: hp(2),
  },
  textInput: {
    height: hp(6),
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  btnContainer: {
    alignItems: 'center',
    display: 'flex',
    width: wp('100%'),
    marginTop: hp(1.75)
  },
  newPlaceBtn: {
    width: wp('85%'),
    marginBottom: hp(3),
    backgroundColor: 'rgb(0,122,255)',
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    fontSize: wp(4.5),
    paddingTop: hp(3),
    lineHeight: hp(3.5),
    fontFamily: 'AppleSDGothicNeo-Medium',
  }
});
