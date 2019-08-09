import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

class Discover extends Component {
    render() {
        return (
          
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Detail')}>
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image 
                style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    width: '80%',
                    height: '80%',
                }}
                source={{ uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'}}
                
            />
          </View>
            </TouchableWithoutFeedback>
        );
      }
}

export default Discover;