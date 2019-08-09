import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class Profile extends Component {
    render() {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>PROFILE</Text>
            <Button title="SETTINGS" onPress={() => this.props.navigation.navigate("Settings")}>SETTINGS</Button>
          </View>
        );
      }
}

export default Profile;