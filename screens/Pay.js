import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { createUser } from "../actions/user";
import { Input, Icon, Divider } from "react-native-elements";
import LoginForm from '../components/LoginForm';

const ORDER_NUMBER = (Math.random() * 100000).toFixed(0)

class Pay extends Component {
    state = {  }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Order #{ORDER_NUMBER}</Text>
                <View style={styles.sectionHeader}>
                    <Text>Card Details</Text>
                    
                </View>
                <View style={{flex: 1}}>
                    <Input placeholder='Card Holder Name' />
                    <Input placeholder='Card Number' />
                    <View>

                    <Input style={{flex: 2}} placeholder='Exp. Date' />
                    <Input style={{flex: 2}} placeholder='CVV' />
                    </View>
                </View>
                <View style={styles.sectionHeader}>
                    <Text>Billing Address</Text>
                </View>
                <View style={{flex: 1}}>
                    <Input placeholder='Street' />
                    <Input placeholder='City' />
                    <View>
                    <Input style={{flex: 2}} placeholder='State' />
                    <Input style={{flex: 2}} placeholder='Zip Code' />
                    </View>
                </View>
                
                <Button onPress={() => this.props.navigation.navigate("OrderStatus")} title={`Place Order`} />
            </View>
        );
    }
}

export default Pay

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionHeader: {
        padding: 30,
        backgroundColor: '#9da1a8',
        opacity: 0.7
    }
})