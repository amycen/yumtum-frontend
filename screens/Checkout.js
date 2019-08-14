import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { createUser } from "../actions/user";
import { Input, Icon, Divider, ButtonGroup, Button } from "react-native-elements";
import LoginForm from '../components/LoginForm';

getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

getETA = () => {
    return this.getRndInteger(1, 9) * 5
}

const ETA = this.getETA()

class Checkout extends Component {
    state = { 
        selectedTipsIndex: 1
    }
    
    updateSelectTipIndex = (selectedTipsIndex) => {
        this.setState({selectedTipsIndex})
    }

    render() {
        const buttons = ['10%', '15%', '20%', 'Custom']
        const { selectedTipsIndex } = this.state
        const subtotal = this.props.selectedItem.price
        const tax = Math.round((subtotal * 0.0875) * 100) / 100
        const tips = Math.round(((0.10 + 0.05 * this.state.selectedTipsIndex) * subtotal)* 100) / 100
        const total = Math.round((subtotal + tax + tips) * 100) / 100
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Order Summary</Text>
                <View style={styles.restaurantName}>
                    <Text>{this.props.selectedItem.restaurant.name}</Text>
                    <Text>{this.props.selectedItem.restaurant.street}</Text>
                    <Text>{this.props.selectedItem.restaurant.city}, {this.props.selectedItem.restaurant.state} {this.props.selectedItem.zip_code}</Text>
                    <Text>ETA {ETA} - {ETA + 5} minutes</Text>
                    <Divider style={{ backgroundColor: 'black' }} />
                    <Text>{this.props.selectedItem.name}</Text>
                    <Text>Qty 1</Text>
                    <Divider style={{ backgroundColor: 'black' }} />
                    <Text>Tips</Text>
                    <ButtonGroup
                        onPress={this.updateSelectTipIndex}
                        selectedIndex={selectedTipsIndex}
                        buttons={buttons}
                        containerStyle={{height: 100}}
                    />
                    <Input keyboardType='numeric' placeholder='Enter Tip Amount'></Input>
                    <Divider style={{ backgroundColor: 'black' }} />
                    <Text>Subtotal: {subtotal.toFixed(2)}</Text>
                    <Text>Tax: {tax.toFixed(2)}</Text>
                    <Text>Tips: {tips.toFixed(2)}</Text>
                    <Text>Total: {total.toFixed(2)}</Text>
                </View>
                <Button onPress={() => this.props.navigation.navigate("Pay")} title={`Pay ${total.toFixed(2)}`} />
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