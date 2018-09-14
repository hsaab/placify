import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, SearchBar } from 'react-native-elements';
import * as gp from "../../API/gPlaces.js";
import ResultPreview from "../../components/ResultPreview.js"
import { withNavigation } from 'react-navigation';

class AddPlace extends React.Component {
  constructor() {
    super();
    this.state = { error: false, predictions: [] };
    this.autocomplete = gp.autocomplete.bind(this);
  }

  static navigationOptions = {
    title: 'Add Place',
    headerTitleStyle: {
      fontSize: wp('6'),
      color: '#333333',
      fontWeight: '500',
      fontFamily: 'AppleSDGothicNeo-Bold'
    },
    headerStyle: {
      borderBottomWidth: 0,
    }
  };

  autoList() {
    const { user } = this.props;
    const { predictions } = this.state;
    const { error } = this.state;

    //If we receive predictions and there is no error, render list of results
    if(predictions.length > 0 && !error) {
      return (
        <FlatList
          data={predictions}
          renderItem={({ item }) =>
          <ResultPreview
            key={item.id}
            item={item}
            user={user}
            getDistance={gp.getDistance}
            navigation={this.props.navigation} />}
          keyExtractor={( item ) => item.id }
          />
      );

    //If we don't receive predictions but there isn't an error, display "No results"
    } else if(predictions.length === 0 && !error) {
      return (
        <View>
          <Text style={styles.text}>-- No results --</Text>
        </View>);
    } else {

    //If there is an error with the server, then we provide error message
      return (
      <View>
        <Text style={styles.text}>-- We are experiencing some technical difficulties. Try again later! --</Text>
      </View>);
    }
  }

  render() {
    const { user } = this.props;
    const { predictions } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type here..."
          lightTheme
          containerStyle={styles.searchInput}
          inputStyle={styles.textInput}
          onChangeText={(text) => this.autocomplete(text, user.coords)}
          noIcon
          />
        { this.autoList() }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    place: state.place
  };
};

export default withNavigation(connect(mapStateToProps)(AddPlace));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e5e5e5',
  },
  searchInput: {
    width: wp('90%'),
    marginTop: hp(2),
    display: 'flex',
    justifyContent: 'center'
  },
  textInput: {
    height: hp(6),
    position: 'relative',
    fontFamily: 'AppleSDGothicNeo-Medium',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo-Medium',
    color: '#333333',
    fontSize: wp(5),
    paddingTop: hp(2.5),
    lineHeight: hp(3.5)
  }
});
