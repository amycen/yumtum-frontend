import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { createUser } from "../actions/user";
import { Input, Icon, Divider, ButtonGroup, Button } from "react-native-elements";
import LoginForm from '../components/LoginForm';

class OrderStatus extends Component {
    state = { 
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>ORDER STATUS</Text>
                <Button title="GO BACK TO PROFILE" onPress={() => this.props.navigation.navigate('Profile')}/>
            </View>
        );
    }
}

const msp = state => {
    return {
        selectedItem: state.item.selectedItem
    }
}
export default connect(msp)(OrderStatus)

const styles = StyleSheet.create({
    container: {
        
    }
})