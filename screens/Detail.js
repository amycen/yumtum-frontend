import React, { Component } from 'react';
import { View, Text } from "react-native";

class Detail extends Component {
    state = {  }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Restaurant Name</Text>
                <Text>Dish INFO</Text>
            </View>
        );
    }
}

export default Detail;