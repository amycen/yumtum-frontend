import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { placeOrder } from "../actions/order";
import { Input, Button } from "react-native-elements";
import Text from '../components/CustomText'


class Pay extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text type='semibold' style={{fontSize: 20, textAlign: 'center', padding: 20}}>Order Payment</Text>
                <View style={styles.sectionHeader}>
                    <Text type='semibold' style={{fontSize: 18, textAlign: 'center'}}>Card Details</Text>
                    
                </View>
                <View style={{flex: 1}}>
                    <Input placeholder='Card Holder Name' />
                    <Input placeholder='Card Number' />
                    <View >
                    <Input placeholder='Exp. Date' />
                    <Input placeholder='CVV' />
                    </View>
                </View>
                <View style={styles.sectionHeader}>
                    <Text type='semibold' style={{fontSize: 18, textAlign: 'center'}}>Billing Address</Text>
                </View>
                <View style={{flex: 1}}>
                    <Input placeholder='Street' />
                    <Input placeholder='City' />
                    <View>
                    <Input style={{flex: 2}} placeholder='State' />
                    <Input style={{flex: 2}} placeholder='Zip Code' />
                    </View>
                </View>
                
                <Button onPress={() => {
                        this.props.placeOrder(this.props.userID, this.props.selectedItem.restaurant.id, 1, this.props.selectedItem.id, this.props.subtotal, this.props.tax, this.props.tips)
                        this.props.navigation.navigate("OrderStatus")
                    }}
                    title={`Pay ${(this.props.subtotal + this.props.tax + this.props.tips).toFixed(2)}`}
                    buttonStyle={{backgroundColor: '#1DA2FF'}}
                    titleStyle={{fontFamily: 'comfortaa-semibold', fontSize: 18}} 
                    containerStlye={{marginTop: "15", marginBottom: "10", fontWeight: '800', padding: 30}} 
                />
            </View>
        );
    }
}

const msp = state => {
    return {
        userID: state.user.userID,
        selectedItem: state.item.selectedItem,
        subtotal: state.order.subtotal,
        tax: state.order.tax,
        tips: state.order.tips
    }
}

export default connect(msp, {placeOrder})(Pay)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionHeader: {
        padding: 15,
        backgroundColor: '#9da1a8',
        opacity: 0.7
    }
})