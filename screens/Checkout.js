import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { createUser } from "../actions/user";
import { Input, Icon } from "react-native-elements";
import LoginForm from '../components/LoginForm';

class Checkout extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Order Summary</Text>
                <View style={styles.restaurantName}>
                    <Text>{this.props.selectedItem.name}</Text>
                </View>
                <Button onPress={() => this.props.navigation.navigate("Pay")} title="PAY" />
            </View>
        );
    }
}

const msp = state => {
    return {
        selectedItem: state.item.selectedItem
    }
}
export default connect(msp)(Checkout)

const styles = StyleSheet.create({
    container: {
        
    },
    title: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    restaurantName: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 10,
        fontWeight: 'bold'
    }
})