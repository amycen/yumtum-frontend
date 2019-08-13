import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { connect } from "react-redux";

class Profile extends Component {

    render() {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Hi, {this.props.firstName}</Text>
            <Button title="SETTINGS" onPress={() => this.props.navigation.navigate("Settings")}>SETTINGS</Button>
          </View>
        );
      }
}

const msp = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(msp)(Profile)